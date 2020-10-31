"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersProfitUseCase = void 0;
const date_fns_1 = require("date-fns");
class OrdersProfitUseCase {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async execute() {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const ordersProfit = await this.OrderModel.find({
            createdAt: { $gte: initial, $lte: final },
            finished: true,
        })
            .populate('items.product')
            .populate('deliveryman');
        const totalOrders = ordersProfit.reduce((sum, order) => {
            return sum + order.total;
        }, 0);
        const totalRate = ordersProfit.reduce((sum, order) => {
            return sum + (order.address ? order.address.district_rate : 0);
        }, 0);
        const totalProducts = ordersProfit.reduce((sum, order) => {
            return (sum +
                order.items.reduce((sum2, item) => {
                    var _a;
                    return sum2 + ((_a = item.product) === null || _a === void 0 ? void 0 : _a.cost) * item.quantity;
                }, 0));
        }, 0);
        const filteredTotal = totalOrders - (totalProducts + totalRate);
        return {
            orders: ordersProfit,
            total: totalOrders.toFixed(2),
            netValue: filteredTotal.toFixed(2),
        };
    }
}
exports.OrdersProfitUseCase = OrdersProfitUseCase;
