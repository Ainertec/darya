import { Model } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../../../interfaces/base';
import { ProductAmountUseCase } from '../../Report/productsAmountUseCase';
import { ProductsAmount } from './printerUseCaseDTO';

export class SoldReportUseCase {
  constructor(
    private OrderModel: Model<OrderInterface>,
    private productsAmount: ProductAmountUseCase,
  ) {}

  async execute() {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());

    const countOrders = await this.OrderModel.find({
      createdAt: { $gte: initial, $lte: final },
      finished: true,
    }).countDocuments({});

    const productsTotalAmount = await this.productsAmount.execute();

    const totalProductsSold = productsTotalAmount.reduce(
      (sum, product: ProductsAmount) => {
        return sum + product.amount;
      },
      0,
    );

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
