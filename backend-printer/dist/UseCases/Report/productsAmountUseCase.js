"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAmountUseCase = void 0;
const date_fns_1 = require("date-fns");
class ProductAmountUseCase {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async execute() {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const productsAmount = await this.OrderModel.aggregate()
            .match({
            createdAt: { $gte: initial, $lte: final },
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
        });
        return productsAmount;
    }
}
exports.ProductAmountUseCase = ProductAmountUseCase;
