import { Model } from 'mongoose';
import { startOfDay, endOfDay, sub } from 'date-fns';
import { OrderInterface } from '../../../../interfaces/base';

export class OrdersProfitUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute() {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());
    const ola = 'hai';

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
      return (
        sum +
        order.items.reduce((sum, item) => {
          return sum + item.product?.cost * item.quantity;
        }, 0)
      );
    }, 0);

    const filteredTotal = totalOrders - (totalProducts + totalRate);

    return {
      orders: ordersProfit,
      total: totalOrders.toFixed(2),
      netValue: filteredTotal.toFixed(2),
    };
  }
}
