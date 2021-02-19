"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const Order_1 = __importStar(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
const District_1 = __importDefault(require("../models/District"));
const Deliveryman_1 = __importDefault(require("../models/Deliveryman"));
const Product_1 = __importDefault(require("../models/Product"));
class OrderController {
    constructor() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    async getTotal(items, rate) {
        let totalProducts = 0;
        await Promise.all(items.map(async (item) => {
            const product = await Product_1.default.findOne({ _id: item.product });
            if (product) {
                totalProducts += product.price * item.quantity;
            }
        }));
        return totalProducts + rate;
    }
    async getAddress(user_id, user_address_id) {
        var _a;
        const user = await User_1.default.findOne({ _id: user_id });
        if (!user)
            throw Error('That user does not exist');
        const address = (_a = user.address) === null || _a === void 0 ? void 0 : _a.find(add => String(add._id) === String(user_address_id));
        if (!address)
            throw Error('That address does not exist');
        const district = await District_1.default.findOne({ _id: address.district });
        if (!district)
            throw Error('That district does not exist');
        return {
            user_address_id: address._id,
            district_id: district._id,
            district_name: district.name,
            district_rate: district.rate,
            street: address.street,
            number: address.number,
            reference: address.reference,
        };
    }
    async getUser(user_id) {
        const user = await User_1.default.findOne({ _id: user_id });
        if (!user)
            throw Error('That user does not exist');
        return {
            user_id,
            name: user.name,
            phone: user.phone,
        };
    }
    async index(request, response) {
        const orders = await Order_1.default.find({ finished: false })
            .populate('deliveryman')
            .populate('items.product');
        return response.json(orders);
    }
    async showByUser(request, response) {
        const { userId } = request;
        const orders = await Order_1.default.find({
            finished: false,
            'user.user_id': userId,
        })
            .populate('deliveryman')
            .populate('items.product');
        return response.json(orders);
    }
    async show(request, response) {
        const { identification } = request.params;
        const order = await Order_1.default.findOne({
            identification,
            finished: false,
        })
            .populate('deliveryman')
            .populate('items.product');
        return response.json(order);
    }
    async showByDeliveryman(request, response) {
        const { deliveryman } = request.params;
        const { ObjectId } = mongoose_1.Types;
        const order = await Order_1.default.find({
            deliveryman: ObjectId(deliveryman),
            finished: false,
        })
            .populate('deliveryman')
            .populate('items.product');
        return response.json(order);
    }
    async store(request, response) {
        var _a, _b;
        const { user_id, deliveryman, user_address_id, items, source, note, payment, viewed, } = request.body;
        const authUserId = request.userId;
        const isValidSource = Order_1.Source.getSource().includes(source);
        if (!isValidSource) {
            return response.status(400).json({ message: 'invalid source' });
        }
        const authUser = await User_1.default.findOne({ _id: authUserId });
        const user = (authUser === null || authUser === void 0 ? void 0 : authUser.admin) ? await User_1.default.findOne({ _id: user_id })
            : authUser;
        const address_id = (authUser === null || authUser === void 0 ? void 0 : authUser.admin) ? user_address_id
            : (_a = authUser.address[0]) === null || _a === void 0 ? void 0 : _a._id;
        if (!user)
            return response.status(400).json('That user does not exist');
        const identification = user.phone && ((_b = user.phone) === null || _b === void 0 ? void 0 : _b.length) > 0
            ? crypto_1.default.randomBytes(4).toString('hex') +
                user.phone[0].slice(user.phone[0].length - 2)
            : crypto_1.default.randomBytes(4).toString('hex');
        try {
            const address = address_id
                ? await this.getAddress(user._id, address_id)
                : undefined;
            const total = address
                ? await this.getTotal(items, address.district_rate)
                : await this.getTotal(items, 0);
            const order = await Order_1.default.create({
                identification,
                user: {
                    user_id: user._id,
                    name: user.name,
                    phone: user.phone,
                },
                address,
                items,
                source,
                note,
                payment,
                total,
                viewed,
            });
            if (deliveryman) {
                const deliverymanPersisted = await Deliveryman_1.default.findOne({
                    _id: deliveryman,
                });
                if (!deliverymanPersisted) {
                    return response.status(400).json('Invalid deliveryman');
                }
                deliverymanPersisted.hasDelivery = true;
                await deliverymanPersisted.save();
                order.deliveryman = deliveryman;
                await order.save();
            }
            await order
                .populate('deliveryman')
                .populate('items.product')
                .execPopulate();
            request.io.emit('newOrder', order);
            return response.json(order);
        }
        catch (error) {
            return response.status(400).json(error.message);
        }
    }
    async update(request, response) {
        var _a, _b, _c;
        const { user_id, deliveryman, identification, user_address_id, items, source, note, payment, finished, viewed, } = request.body;
        const { id } = request.params;
        const order = await Order_1.default.findOne({ _id: id });
        if (!order)
            return response.status(400).json('Order does not exist');
        if (identification)
            order.identification = identification;
        if (items) {
            order.items = items;
            order.total = await this.getTotal(items, ((_a = order.address) === null || _a === void 0 ? void 0 : _a.district_rate) || 0);
        }
        if (source)
            order.source = source;
        if (deliveryman)
            order.deliveryman = deliveryman;
        if (note)
            order.note = note;
        if (payment)
            order.payment = payment;
        if (viewed)
            order.viewed = viewed;
        if (finished) {
            const deliverymanPersisted = await Deliveryman_1.default.findOne({
                _id: order.deliveryman,
            });
            if (deliverymanPersisted) {
                deliverymanPersisted.available = false;
                deliverymanPersisted.hasDelivery = false;
                await deliverymanPersisted.save();
            }
            order.finished = true;
        }
        if (user_id && String(order.user.user_id) !== String(user_id)) {
            try {
                const user = await this.getUser(user_id);
                order.user = user;
            }
            catch (error) {
                return response.status(400).json(error);
            }
        }
        if (user_address_id &&
            String((_b = order.address) === null || _b === void 0 ? void 0 : _b.user_address_id) !== String(user_address_id)) {
            try {
                const address = await this.getAddress(order.user.user_id, user_address_id);
                order.address = address;
                order.total = await this.getTotal(order.items, ((_c = order.address) === null || _c === void 0 ? void 0 : _c.district_rate) || 0);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        }
        await order.save();
        await order
            .populate('deliveryman')
            .populate('items.product')
            .execPopulate();
        return response.json(order);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Order_1.default.deleteOne({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new OrderController();
