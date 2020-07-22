"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var date_fns_1 = require("date-fns");
var Order_1 = __importDefault(require("../models/Order"));
var ReportController = /** @class */ (function () {
    function ReportController() {
    }
    ReportController.prototype.deliverymanPayment = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var deliveryman_id, initial, final, ObjectId, deliveryRate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryman_id = String(request.params.deliveryman_id);
                        initial = date_fns_1.startOfHour(new Date());
                        final = date_fns_1.endOfHour(new Date());
                        ObjectId = mongoose_1.Types.ObjectId;
                        console.log(deliveryman_id);
                        return [4 /*yield*/, Order_1.default.aggregate()
                                .match({
                                deliveryman: ObjectId(deliveryman_id),
                                createdAt: { $gte: initial, $lte: final },
                                finished: true,
                            })
                                .group({
                                _id: '$deliveryman',
                                rate: { $sum: '$address.district_rate' },
                            })];
                    case 1:
                        deliveryRate = _a.sent();
                        return [2 /*return*/, response.json(deliveryRate)];
                }
            });
        });
    };
    ReportController.prototype.allFinishedOrdersByDeliveryman = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var deliveryman_id, initial, final, ObjectId, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryman_id = request.params.deliveryman_id;
                        initial = date_fns_1.startOfHour(new Date());
                        final = date_fns_1.endOfHour(new Date());
                        ObjectId = mongoose_1.Types.ObjectId;
                        return [4 /*yield*/, Order_1.default.find({
                                deliveryman: ObjectId(deliveryman_id),
                                createdAt: { $gte: initial, $lte: final },
                                finished: true,
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
    ReportController.prototype.ordersProfit = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var initial, final, ordersProfit, totalOrders, totalRate, totalProducts, filteredTotal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initial = date_fns_1.startOfHour(new Date());
                        final = date_fns_1.endOfHour(new Date());
                        return [4 /*yield*/, Order_1.default.find({
                                createdAt: { $gte: initial, $lte: final },
                                finished: true,
                            })
                                .populate('items.product')
                                .populate('deliveryman')];
                    case 1:
                        ordersProfit = _a.sent();
                        totalOrders = ordersProfit.reduce(function (sum, order) {
                            return sum + order.total;
                        }, 0);
                        totalRate = ordersProfit.reduce(function (sum, order) {
                            return sum + order.address.district_rate;
                        }, 0);
                        totalProducts = ordersProfit.reduce(function (sum, order) {
                            return (sum +
                                order.items.reduce(function (sum, item) {
                                    var _a;
                                    return sum + ((_a = item.product) === null || _a === void 0 ? void 0 : _a.cost) * item.quantity;
                                }, 0));
                        }, 0);
                        filteredTotal = totalOrders - (totalProducts + totalRate);
                        return [2 /*return*/, response.json({ orders: ordersProfit, total: totalOrders, netValue: filteredTotal })];
                }
            });
        });
    };
    ReportController.prototype.productsDispenseAndGain = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, productDispenseAndGain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.default.aggregate()
                            .match({
                            finished: true,
                        })
                            .unwind('items')
                            .lookup({
                            from: 'products',
                            localField: 'items.product',
                            foreignField: '_id',
                            as: 'products',
                        })
                            .unwind('products')
                            .group({
                            _id: {
                                id: '$products._id',
                                name: '$products.name',
                                description: '$products.description',
                                price: '$products.price',
                                cost: '$products.cost',
                                stock: '$products.stock',
                            },
                            gain: { $sum: { $multiply: ['$products.price', '$items.quantity'] } },
                        })];
                    case 1:
                        orders = _a.sent();
                        productDispenseAndGain = orders.map(function (order) {
                            var _a;
                            return __assign(__assign({}, order), { dispense: ((_a = order._id) === null || _a === void 0 ? void 0 : _a.cost) * (order._id.stock ? order._id.stock : 0) });
                        });
                        return [2 /*return*/, response.json(productDispenseAndGain)];
                }
            });
        });
    };
    ReportController.prototype.productsAmount = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var productsAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.default.aggregate()
                            .match({
                            finished: true,
                        })
                            .unwind('items')
                            .lookup({
                            from: 'products',
                            localField: 'items.product',
                            foreignField: '_id',
                            as: 'products',
                        })
                            .unwind('products')
                            .group({
                            _id: {
                                id: '$products._id',
                                name: '$products.name',
                                description: '$products.description',
                                price: '$products.price',
                                cost: '$products.cost',
                                stock: '$products.stock',
                            },
                            amount: { $sum: '$items.quantity' },
                        })];
                    case 1:
                        productsAmount = _a.sent();
                        return [2 /*return*/, response.json(productsAmount)];
                }
            });
        });
    };
    ReportController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = date_fns_1.sub(new Date(), { years: 2 });
                        return [4 /*yield*/, Order_1.default.deleteMany({
                                createdAt: { $lte: date },
                                finished: true,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    return ReportController;
}());
exports.default = new ReportController();
