"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const Order_1 = __importDefault(require("../models/Order"));
const ordersProfitUseCase_1 = require("../useCases/Report/ordersProfitUseCase");
const deliverymanPaymentUseCase_1 = require("../useCases/Report/deliverymanPaymentUseCase");
const productDispenseAndGainUseCase_1 = require("../useCases/Report/productDispenseAndGainUseCase");
const productsAmountUseCase_1 = require("../useCases/Report/productsAmountUseCase");
const finishedOrdersUseCase_1 = require("../useCases/Report/finishedOrdersUseCase");
class ReportController {
    async deliverymanPayment(request, response) {
        const deliverymanPaymentUseCase = new deliverymanPaymentUseCase_1.DeliverymanPaymentUseCase(Order_1.default);
        const payment = await deliverymanPaymentUseCase.execute(request.params.deliveryman_id);
        return response.json(payment);
    }
    async allFinishedOrdersByDeliveryman(request, response) {
        const finishedOrdersInstance = new finishedOrdersUseCase_1.FinishedOrdersUseCase(Order_1.default);
        const finishedOrders = await finishedOrdersInstance.execute(request.params.deliveryman_id);
        return response.json(finishedOrders);
    }
    async ordersProfit(request, response) {
        const orderProfitUseCase = new ordersProfitUseCase_1.OrdersProfitUseCase(Order_1.default);
        const ordersProfitReturn = await orderProfitUseCase.execute();
        return response.json(ordersProfitReturn);
    }
    async productsDispenseAndGain(request, response) {
        const dispenseAndGain = new productDispenseAndGainUseCase_1.ProductDispenseAndGainUseCase(Order_1.default);
        const productDispenseAndGain = await dispenseAndGain.execute();
        return response.json(productDispenseAndGain);
    }
    async productsAmount(request, response) {
        const productAmountInstance = new productsAmountUseCase_1.ProductAmountUseCase(Order_1.default);
        const amount = await productAmountInstance.execute();
        return response.json(amount);
    }
    async delete(req, res) {
        const date = date_fns_1.sub(new Date(), { years: 2 });
        await Order_1.default.deleteMany({
            createdAt: { $lte: date },
            finished: true,
        });
        return res.status(200).send();
    }
}
exports.default = new ReportController();
