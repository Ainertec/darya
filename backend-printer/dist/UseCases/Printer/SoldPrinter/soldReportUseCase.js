"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldReportUseCase = void 0;
const date_fns_1 = require("date-fns");
class SoldReportUseCase {
    constructor(OrderModel, productsAmount) {
        this.OrderModel = OrderModel;
        this.productsAmount = productsAmount;
    }
    async execute() {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const countOrders = await this.OrderModel.find({
            createdAt: { $gte: initial, $lte: final },
            finished: true,
        }).countDocuments({});
        const productsTotalAmount = await this.productsAmount.execute();
        const totalProductsSold = productsTotalAmount.reduce((sum, product) => {
            return sum + product.amount;
        }, 0);
        const dayOrdersByPayment = await this.OrderModel.aggregate()
            .match({
            createdAt: { $gte: initial, $lte: final },
            finished: true,
        })
            .group({
            _id: '$payment',
            orders_total: { $sum: 1 },
            orders_total_price: { $sum: '$total' },
        });
        const dayOrders = await this.OrderModel.find({
            createdAt: { $gte: initial, $lte: final },
            finished: true,
        }).populate('items.product');
        const totalOrders = dayOrders.reduce((sum, order) => {
            return sum + order.total;
        }, 0);
        return {
            countOrders,
            productsTotalAmount,
            totalProductsSold,
            dayOrdersByPayment,
            totalOrders: totalOrders.toFixed(2),
        };
    }
}
exports.SoldReportUseCase = SoldReportUseCase;
