import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { startOfDay, endOfDay, sub } from 'date-fns';
import Order from '../models/Order';
import { ProductInterface } from '../../interfaces/base';

import { OrdersProfitUseCase } from '../useCases/Report/OrdersProfit/ordersProfitUseCase';

interface InterfaceDispenseAndGain {
  _id: ProductInterface;
  dispense: number;
  gain: number;
}

class ReportController {
  async deliverymanPayment(request: Request, response: Response) {
    const deliveryman_id = String(request.params.deliveryman_id);
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());
    const ObjectId = Types.ObjectId;

    const deliveryRate = await Order.aggregate()
      .match({
        deliveryman: ObjectId(deliveryman_id),
        createdAt: { $gte: initial, $lte: final },
        finished: true,
      })
      .group({
        _id: '$deliveryman',
        rate: { $sum: '$address.district_rate' },
      });

    return response.json(deliveryRate);
  }

  async allFinishedOrdersByDeliveryman(request: Request, response: Response) {
    const { deliveryman_id } = request.params;
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());
    const ObjectId = Types.ObjectId;

    const orders = await Order.find({
      deliveryman: ObjectId(deliveryman_id),
      createdAt: { $gte: initial, $lte: final },
      finished: true,
    })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(orders);
  }

  async ordersProfit(request: Request, response: Response) {
    const orderProfitUseCase = new OrdersProfitUseCase(Order);

    const ordersProfitReturn = await orderProfitUseCase.excute();

    return response.json(ordersProfitReturn);
  }

  async productsDispenseAndGain(request: Request, response: Response) {
    const orders = await Order.aggregate<InterfaceDispenseAndGain>()
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
        dispense: { $sum: { $multiply: ['$products.cost', '$items.quantity'] } },
      });
    const filteredOrders = orders.map((order) => {
      return {
        ...order,
        gain: order.gain.toFixed(2),
        dispense: order.dispense.toFixed(2),
      };
    });
    return response.json(filteredOrders);
  }

  async productsAmount(request: Request, response: Response) {
    const productsAmount = await Order.aggregate()
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
        amount: { $sum: '$items.quantity' },
      });

    return response.json(productsAmount);
  }

  public async delete(req: Request, res: Response) {
    const date = sub(new Date(), { years: 2 });

    await Order.deleteMany({
      createdAt: { $lte: date },
      finished: true,
    });

    return res.status(200).send();
  }
}

export default new ReportController();
