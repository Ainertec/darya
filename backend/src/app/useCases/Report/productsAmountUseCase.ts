import { Model } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../../interfaces/base';

export class ProductAmountUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute() {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());

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
