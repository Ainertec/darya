import { Model } from 'mongoose';
import { OrderInterface, ProductInterface } from '../../../interfaces/base';

interface InterfaceDispenseAndGain {
  _id: ProductInterface;
  dispense: number;
  gain: number;
}

export class ProductDispenseAndGainUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute() {
    const orders = await this.OrderModel.aggregate<InterfaceDispenseAndGain>()
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
      return {
        ...order,
        gain: order.gain.toFixed(2),
        dispense: order.dispense.toFixed(2),
      };
    });
    return filteredOrders;
  }
}
