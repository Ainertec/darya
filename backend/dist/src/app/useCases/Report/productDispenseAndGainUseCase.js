"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDispenseAndGainUseCase = void 0;
class ProductDispenseAndGainUseCase {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async execute() {
        const orders = await this.OrderModel.aggregate()
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
            dispense: {
                $sum: { $multiply: ['$products.cost', '$items.quantity'] },
            },
        });
        const filteredOrders = orders.map(order => {
            return Object.assign(Object.assign({}, order), { gain: order.gain.toFixed(2), dispense: order.dispense.toFixed(2) });
        });
        return filteredOrders;
    }
}
exports.ProductDispenseAndGainUseCase = ProductDispenseAndGainUseCase;
