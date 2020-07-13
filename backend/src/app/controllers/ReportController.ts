import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { startOfHour, endOfHour } from 'date-fns';
import Order from '../models/Order';

class ReportController {
  async deliverymanPayment(request: Request, response: Response) {
    const deliveryman_id = String(request.query.deliveryman_id);
    const initial = startOfHour(new Date());
    const final = endOfHour(new Date());
    const ObjectId = Types.ObjectId;

    const deliveryRate = await Order.aggregate()
      .match({
        deliveryman: ObjectId(deliveryman_id),
        createdAt: { $gte: initial, $lte: final },
      })
      .group({
        _id: '$deliveryman',
        rate: { $sum: '$address.district_rate' },
      });

    // const delivaryman = await Deliveryman.findOne({ _id: deliveryman_id });
    // console.log(deliveryRate, delivaryman);
    return response.json(deliveryRate);
  }

  async ordersProfit(request: Request, response: Response) {
    // {
    //   total:
    //   order:[],
    //   totalLiquido:
    // }
    const initial = startOfHour(new Date());
    const final = endOfHour(new Date());

    const ordersProfit = await Order.find({ createdAt: { $gte: initial, $lte: final } })
      .populate('items.product')
      .populate('deliveryman');

    const totalOrders = ordersProfit.reduce((sum, order) => {
      return sum + order.total;
    }, 0);
    return response.json({ orders: ordersProfit, total: totalOrders });
  }
}

export default new ReportController();
