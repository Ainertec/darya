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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverymanPaymentUseCase = void 0;
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
var mongoose_1 = require("mongoose");
var date_fns_1 = require("date-fns");
var DeliverymanPaymentUseCase = /** @class */ (function () {
    function DeliverymanPaymentUseCase(OrderModel) {
        this.OrderModel = OrderModel;
    }
    DeliverymanPaymentUseCase.prototype.execute = function (deliveryman_id) {
        return __awaiter(this, void 0, void 0, function () {
            var initial, final, ObjectId, ordersDeliveryman, deliverymanRate, deliverymanAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initial = date_fns_1.startOfDay(new Date());
                        final = date_fns_1.endOfDay(new Date());
                        ObjectId = mongoose_1.Types.ObjectId;
                        return [4 /*yield*/, this.OrderModel.find({
                                deliveryman: ObjectId(deliveryman_id),
                                createdAt: { $gte: initial, $lte: final },
                                finished: true,
                            })
                                .populate('items.product')
                                .populate('deliveryman')];
                    case 1:
                        ordersDeliveryman = _a.sent();
                        if (ordersDeliveryman.length === 0) {
                            return [2 /*return*/];
                        }
                        deliverymanRate = ordersDeliveryman.reduce(function (sum, order) {
                            return sum + order.address.district_rate;
                        }, 0);
                        deliverymanAddress = ordersDeliveryman.map(function (order) { return order.address; });
                        return [2 /*return*/, {
                                deliverymanAddress: deliverymanAddress,
                                deliverymanRate: deliverymanRate.toFixed(2),
                                deliveryman: ordersDeliveryman[0]
                                    .deliveryman,
                            }];
                }
            });
        });
    };
    return DeliverymanPaymentUseCase;
}());
exports.DeliverymanPaymentUseCase = DeliverymanPaymentUseCase;
