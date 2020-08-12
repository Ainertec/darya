"use strict";
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
var date_fns_1 = require("date-fns");
var Order_1 = __importDefault(require("../models/Order"));
var ordersProfitUseCase_1 = require("../useCases/Report/ordersProfitUseCase");
var deliverymanPaymentUseCase_1 = require("../useCases/Report/deliverymanPaymentUseCase");
var productDispenseAndGainUseCase_1 = require("../useCases/Report/productDispenseAndGainUseCase");
var productsAmountUseCase_1 = require("../useCases/Report/productsAmountUseCase");
var finishedOrdersUseCase_1 = require("../useCases/Report/finishedOrdersUseCase");
var ReportController = /** @class */ (function () {
    function ReportController() {
    }
    ReportController.prototype.deliverymanPayment = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var deliverymanPaymentUseCase, payment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliverymanPaymentUseCase = new deliverymanPaymentUseCase_1.DeliverymanPaymentUseCase(Order_1.default);
                        return [4 /*yield*/, deliverymanPaymentUseCase.execute(request.params.deliveryman_id)];
                    case 1:
                        payment = _a.sent();
                        return [2 /*return*/, response.json(payment)];
                }
            });
        });
    };
    ReportController.prototype.allFinishedOrdersByDeliveryman = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var finishedOrdersInstance, finishedOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        finishedOrdersInstance = new finishedOrdersUseCase_1.FinishedOrdersUseCase(Order_1.default);
                        return [4 /*yield*/, finishedOrdersInstance.execute(request.params.deliveryman_id)];
                    case 1:
                        finishedOrders = _a.sent();
                        return [2 /*return*/, response.json(finishedOrders)];
                }
            });
        });
    };
    ReportController.prototype.ordersProfit = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var orderProfitUseCase, ordersProfitReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderProfitUseCase = new ordersProfitUseCase_1.OrdersProfitUseCase(Order_1.default);
                        return [4 /*yield*/, orderProfitUseCase.execute()];
                    case 1:
                        ordersProfitReturn = _a.sent();
                        return [2 /*return*/, response.json(ordersProfitReturn)];
                }
            });
        });
    };
    ReportController.prototype.productsDispenseAndGain = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var dispenseAndGain, productDispenseAndGain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispenseAndGain = new productDispenseAndGainUseCase_1.ProductDispenseAndGainUseCase(Order_1.default);
                        return [4 /*yield*/, dispenseAndGain.execute()];
                    case 1:
                        productDispenseAndGain = _a.sent();
                        return [2 /*return*/, response.json(productDispenseAndGain)];
                }
            });
        });
    };
    ReportController.prototype.productsAmount = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var productAmountInstance, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productAmountInstance = new productsAmountUseCase_1.ProductAmountUseCase(Order_1.default);
                        return [4 /*yield*/, productAmountInstance.execute()];
                    case 1:
                        amount = _a.sent();
                        return [2 /*return*/, response.json(amount)];
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
