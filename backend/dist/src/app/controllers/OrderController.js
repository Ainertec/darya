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
var User_1 = __importDefault(require("../models/User"));
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
    OrderController.prototype.getAddress = function (user_id, user_address_id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, address, district;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ _id: user_id })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            throw Error('That user does not exist');
                        address = (_a = user.address) === null || _a === void 0 ? void 0 : _a.find(function (add) { return String(add._id) === String(user_address_id); });
                        if (!address)
                            throw Error('That address does not exist');
                        return [4 /*yield*/, District_1.default.findOne({ _id: address.district })];
                    case 2:
                        district = _b.sent();
                        if (!district)
                            throw Error('That district does not exist');
                        return [2 /*return*/, {
                                user_address_id: address._id,
                                district_id: district._id,
                                district_name: district.name,
                                district_rate: district.rate,
                                street: address.street,
                                number: address.number,
                                reference: address.reference,
                            }];
                }
            });
        });
    };
    OrderController.prototype.getUser = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ _id: user_id })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw Error('That user does not exist');
                        return [2 /*return*/, {
                                user_id: user_id,
                                name: user.name,
                                phone: user.phone,
                            }];
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
    OrderController.prototype.showByUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.userId;
                        return [4 /*yield*/, Order_1.default.find({
                                finished: false,
                                'user.user_id': userId,
                            })
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
                        return [4 /*yield*/, Order_1.default.findOne({
                                identification: identification,
                                finished: false,
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
                                finished: false,
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, user_id, deliveryman, user_address_id, items, source, note, payment, viewed, authUserId, isValidSource, authUser, user, _d, address_id, identification, address, _e, total, _f, order, deliverymanPersisted, error_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _c = request.body, user_id = _c.user_id, deliveryman = _c.deliveryman, user_address_id = _c.user_address_id, items = _c.items, source = _c.source, note = _c.note, payment = _c.payment, viewed = _c.viewed;
                        authUserId = request.userId;
                        isValidSource = Order_1.Source.getSource().includes(source);
                        if (!isValidSource) {
                            return [2 /*return*/, response.status(400).json({ message: 'invalid source' })];
                        }
                        return [4 /*yield*/, User_1.default.findOne({ _id: authUserId })];
                    case 1:
                        authUser = _g.sent();
                        if (!(authUser === null || authUser === void 0 ? void 0 : authUser.admin)) return [3 /*break*/, 3];
                        return [4 /*yield*/, User_1.default.findOne({ _id: user_id })];
                    case 2:
                        _d = _g.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _d = authUser;
                        _g.label = 4;
                    case 4:
                        user = _d;
                        address_id = (authUser === null || authUser === void 0 ? void 0 : authUser.admin) ? user_address_id
                            : (_a = authUser.address[0]) === null || _a === void 0 ? void 0 : _a._id;
                        if (!user)
                            return [2 /*return*/, response.status(400).json('That user does not exist')];
                        identification = user.phone && ((_b = user.phone) === null || _b === void 0 ? void 0 : _b.length) > 0
                            ? crypto_1.default.randomBytes(4).toString('hex') +
                                user.phone[0].slice(user.phone[0].length - 2)
                            : crypto_1.default.randomBytes(4).toString('hex');
                        _g.label = 5;
                    case 5:
                        _g.trys.push([5, 19, , 20]);
                        if (!address_id) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getAddress(user._id, address_id)];
                    case 6:
                        _e = _g.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _e = undefined;
                        _g.label = 8;
                    case 8:
                        address = _e;
                        if (!address) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getTotal(items, address.district_rate)];
                    case 9:
                        _f = _g.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.getTotal(items, 0)];
                    case 11:
                        _f = _g.sent();
                        _g.label = 12;
                    case 12:
                        total = _f;
                        return [4 /*yield*/, Order_1.default.create({
                                identification: identification,
                                user: {
                                    user_id: user._id,
                                    name: user.name,
                                    phone: user.phone,
                                },
                                address: address,
                                items: items,
                                source: source,
                                note: note,
                                payment: payment,
                                total: total,
                                viewed: viewed,
                            })];
                    case 13:
                        order = _g.sent();
                        if (!deliveryman) return [3 /*break*/, 17];
                        return [4 /*yield*/, Deliveryman_1.default.findOne({
                                _id: deliveryman,
                            })];
                    case 14:
                        deliverymanPersisted = _g.sent();
                        if (!deliverymanPersisted) {
                            return [2 /*return*/, response.status(400).json('Invalid deliveryman')];
                        }
                        deliverymanPersisted.hasDelivery = true;
                        return [4 /*yield*/, deliverymanPersisted.save()];
                    case 15:
                        _g.sent();
                        order.deliveryman = deliveryman;
                        return [4 /*yield*/, order.save()];
                    case 16:
                        _g.sent();
                        _g.label = 17;
                    case 17: return [4 /*yield*/, order
                            .populate('deliveryman')
                            .populate('items.product')
                            .execPopulate()];
                    case 18:
                        _g.sent();
                        request.io.emit('newOrder', order);
                        return [2 /*return*/, response.json(order)];
                    case 19:
                        error_1 = _g.sent();
                        return [2 /*return*/, response.status(400).json(error_1.message)];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.update = function (request, response) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, user_id, deliveryman, identification, user_address_id, items, source, note, payment, finished, viewed, id, order, _e, deliverymanPersisted, user, error_2, address, _f, error_3;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _d = request.body, user_id = _d.user_id, deliveryman = _d.deliveryman, identification = _d.identification, user_address_id = _d.user_address_id, items = _d.items, source = _d.source, note = _d.note, payment = _d.payment, finished = _d.finished, viewed = _d.viewed;
                        id = request.params.id;
                        return [4 /*yield*/, Order_1.default.findOne({ _id: id })];
                    case 1:
                        order = _g.sent();
                        if (!order)
                            return [2 /*return*/, response.status(400).json('Order does not exist')];
                        if (identification)
                            order.identification = identification;
                        if (!items) return [3 /*break*/, 3];
                        order.items = items;
                        _e = order;
                        return [4 /*yield*/, this.getTotal(items, ((_a = order.address) === null || _a === void 0 ? void 0 : _a.district_rate) || 0)];
                    case 2:
                        _e.total = _g.sent();
                        _g.label = 3;
                    case 3:
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
                        if (!finished) return [3 /*break*/, 7];
                        return [4 /*yield*/, Deliveryman_1.default.findOne({
                                _id: order.deliveryman,
                            })];
                    case 4:
                        deliverymanPersisted = _g.sent();
                        if (!deliverymanPersisted) return [3 /*break*/, 6];
                        deliverymanPersisted.available = false;
                        deliverymanPersisted.hasDelivery = false;
                        return [4 /*yield*/, deliverymanPersisted.save()];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        order.finished = true;
                        _g.label = 7;
                    case 7:
                        if (!(user_id && String(order.user.user_id) !== String(user_id))) return [3 /*break*/, 11];
                        _g.label = 8;
                    case 8:
                        _g.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.getUser(user_id)];
                    case 9:
                        user = _g.sent();
                        order.user = user;
                        return [3 /*break*/, 11];
                    case 10:
                        error_2 = _g.sent();
                        return [2 /*return*/, response.status(400).json(error_2)];
                    case 11:
                        if (!(user_address_id &&
                            String((_b = order.address) === null || _b === void 0 ? void 0 : _b.user_address_id) !== String(user_address_id))) return [3 /*break*/, 16];
                        _g.label = 12;
                    case 12:
                        _g.trys.push([12, 15, , 16]);
                        return [4 /*yield*/, this.getAddress(order.user.user_id, user_address_id)];
                    case 13:
                        address = _g.sent();
                        order.address = address;
                        _f = order;
                        return [4 /*yield*/, this.getTotal(order.items, ((_c = order.address) === null || _c === void 0 ? void 0 : _c.district_rate) || 0)];
                    case 14:
                        _f.total = _g.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        error_3 = _g.sent();
                        return [2 /*return*/, response.status(400).json(error_3)];
                    case 16: return [4 /*yield*/, order.save()];
                    case 17:
                        _g.sent();
                        return [4 /*yield*/, order
                                .populate('deliveryman')
                                .populate('items.product')
                                .execPopulate()];
                    case 18:
                        _g.sent();
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
