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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var crypto_1 = __importDefault(require("crypto"));
var Order_1 = __importStar(require("../models/Order"));
var Client_1 = __importDefault(require("../models/Client"));
var District_1 = __importDefault(require("../models/District"));
var Deliveryman_1 = __importDefault(require("../models/Deliveryman"));
var Product_1 = __importDefault(require("../models/Product"));
var OrderController = /** @class */ (function () {
    function OrderController() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    OrderController.prototype.getTotal = function (items, rate) {
        return __awaiter(this, void 0, void 0, function () {
            var totalProducts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalProducts = 0;
                        return [4 /*yield*/, Promise.all(items.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var product;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Product_1.default.findOne({ _id: item.product })];
                                        case 1:
                                            product = _a.sent();
                                            if (product) {
                                                totalProducts += product.price * item.quantity;
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, totalProducts + rate];
                }
            });
        });
    };
    OrderController.prototype.addOrUpdateAddress = function (order, client_id, client_address_id) {
        return __awaiter(this, void 0, void 0, function () {
            var client, address, district;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Client_1.default.findOne({ _id: client_id })];
                    case 1:
                        client = _a.sent();
                        if (!client)
                            return [2 /*return*/, 'That client does not exist'];
                        address = client.address.find(function (add) { return add._id == client_address_id; });
                        if (!address)
                            return [2 /*return*/, 'That address does not exist'];
                        return [4 /*yield*/, District_1.default.findOne({ _id: address.district })];
                    case 2:
                        district = _a.sent();
                        if (!district)
                            return [2 /*return*/, 'That district does not exist'];
                        order.address = {
                            client_address_id: address._id,
                            district_id: district._id,
                            district_name: district.name,
                            district_rate: district.rate,
                            street: address.street,
                            number: address.number,
                            reference: address.reference,
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.addOrUpdateClient = function (order, client_id) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Client_1.default.findOne({ _id: client_id })];
                    case 1:
                        client = _a.sent();
                        if (!client)
                            return [2 /*return*/, 'That client does not exist'];
                        order.client = {
                            client_id: client_id,
                            name: client.name,
                            phone: client.phone,
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.default.find({ finished: false })
                            .populate('deliveryman')
                            .populate('items.product')];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, response.json(orders)];
                }
            });
        });
    };
    OrderController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var identification, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        identification = request.params.identification;
                        return [4 /*yield*/, Order_1.default.findOne({ identification: identification })
                                .populate('deliveryman')
                                .populate('items.product')];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, response.json(order)];
                }
            });
        });
    };
    OrderController.prototype.showByDeliveryman = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var deliveryman, ObjectId, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryman = request.params.deliveryman;
                        ObjectId = mongoose_1.Types.ObjectId;
                        return [4 /*yield*/, Order_1.default.find({
                                deliveryman: ObjectId(deliveryman),
                            })
                                .populate('deliveryman')
                                .populate('items.product')];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, response.json(order)];
                }
            });
        });
    };
    OrderController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, client_id, deliveryman, client_address_id, items, source, note, payment, isValidSource, client, address, district, identification, total, order, deliverymanPersisted;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, client_id = _a.client_id, deliveryman = _a.deliveryman, client_address_id = _a.client_address_id, items = _a.items, source = _a.source, note = _a.note, payment = _a.payment;
                        isValidSource = Order_1.Source.getSource().includes(source);
                        if (!isValidSource) {
                            return [2 /*return*/, response.status(400).json({ message: 'invalid source' })];
                        }
                        return [4 /*yield*/, Client_1.default.findOne({ _id: client_id })];
                    case 1:
                        client = _b.sent();
                        if (!client)
                            return [2 /*return*/, response.status(400).json('That client does not exist')];
                        address = client.address.find(function (add) { return add._id == client_address_id; });
                        if (!address)
                            return [2 /*return*/, response.status(400).json('That address does not exist')];
                        return [4 /*yield*/, District_1.default.findOne({ _id: address.district })];
                    case 2:
                        district = _b.sent();
                        if (!district)
                            return [2 /*return*/, response.status(400).json('That district does not exist')];
                        identification = crypto_1.default.randomBytes(4).toString('hex') + client.phone[0].slice(client.phone[0].length - 2);
                        return [4 /*yield*/, this.getTotal(items, district.rate)];
                    case 3:
                        total = _b.sent();
                        return [4 /*yield*/, Order_1.default.create({
                                identification: identification,
                                client: {
                                    client_id: client_id,
                                    name: client.name,
                                    phone: client.phone,
                                },
                                deliveryman: deliveryman,
                                address: {
                                    client_address_id: address._id,
                                    district_id: district._id,
                                    district_name: district.name,
                                    district_rate: district.rate,
                                    street: address.street,
                                    number: address.number,
                                    reference: address.reference,
                                },
                                items: items,
                                source: source,
                                note: note,
                                payment: payment,
                                total: total,
                            })];
                    case 4:
                        order = _b.sent();
                        return [4 /*yield*/, order.populate('deliveryman').populate('items.product').execPopulate()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, Deliveryman_1.default.findOne({ _id: deliveryman })];
                    case 6:
                        deliverymanPersisted = _b.sent();
                        if (!deliverymanPersisted) {
                            return [2 /*return*/, response.status(400).json('Invalid deliveryman')];
                        }
                        deliverymanPersisted.hasDelivery = true;
                        return [4 /*yield*/, deliverymanPersisted.save()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, response.json(order)];
                }
            });
        });
    };
    OrderController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, client_id, deliveryman, identification, client_address_id, items, source, note, payment, finished, id, order, _b, deliverymanPersisted, error, error, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = request.body, client_id = _a.client_id, deliveryman = _a.deliveryman, identification = _a.identification, client_address_id = _a.client_address_id, items = _a.items, source = _a.source, note = _a.note, payment = _a.payment, finished = _a.finished;
                        id = request.params.id;
                        return [4 /*yield*/, Order_1.default.findOne({ _id: id })];
                    case 1:
                        order = _d.sent();
                        if (!order)
                            return [2 /*return*/, response.status(400).json('Order does not exist')];
                        if (identification)
                            order.identification = identification;
                        if (!items) return [3 /*break*/, 3];
                        order.items = items;
                        _b = order;
                        return [4 /*yield*/, this.getTotal(items, order.address.district_rate)];
                    case 2:
                        _b.total = _d.sent();
                        _d.label = 3;
                    case 3:
                        if (source)
                            order.source = source;
                        if (deliveryman)
                            order.deliveryman = deliveryman;
                        if (note)
                            order.note = note;
                        if (payment)
                            order.payment = payment;
                        if (!finished) return [3 /*break*/, 6];
                        return [4 /*yield*/, Deliveryman_1.default.findOne({ _id: order.deliveryman })];
                    case 4:
                        deliverymanPersisted = _d.sent();
                        if (!deliverymanPersisted)
                            return [2 /*return*/, response.status(400).json('Invalid deliveryman')];
                        deliverymanPersisted.available = false;
                        deliverymanPersisted.hasDelivery = false;
                        return [4 /*yield*/, deliverymanPersisted.save()];
                    case 5:
                        _d.sent();
                        order.finished = true;
                        _d.label = 6;
                    case 6:
                        if (!(client_id && String(order.client.client_id) !== String(client_id))) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.addOrUpdateClient(order, client_id)];
                    case 7:
                        error = _d.sent();
                        if (error) {
                            return [2 /*return*/, response.status(400).json(error)];
                        }
                        _d.label = 8;
                    case 8:
                        if (!(client_address_id &&
                            String(order.address.client_address_id) !== String(client_address_id))) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.addOrUpdateAddress(order, order.client.client_id, client_address_id)];
                    case 9:
                        error = _d.sent();
                        _c = order;
                        return [4 /*yield*/, this.getTotal(order.items, order.address.district_rate)];
                    case 10:
                        _c.total = _d.sent();
                        if (error) {
                            return [2 /*return*/, response.status(400).json(error)];
                        }
                        _d.label = 11;
                    case 11: return [4 /*yield*/, order.save()];
                    case 12:
                        _d.sent();
                        return [4 /*yield*/, order.populate('deliveryman').populate('items.product').execPopulate()];
                    case 13:
                        _d.sent();
                        return [2 /*return*/, response.json(order)];
                }
            });
        });
    };
    OrderController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, Order_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                }
            });
        });
    };
    return OrderController;
}());
exports.default = new OrderController();
