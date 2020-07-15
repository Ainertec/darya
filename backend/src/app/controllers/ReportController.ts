import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { startOfHour, endOfHour, sub } from 'date-fns';
import Order from '../models/Order';
import { ProductInterface } from '../../interfaces/base';

interface InterfaceDispenseAndGain {
  _id: ProductInterface;
  dispense: number;
  gain: number;
}

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

    return response.json(deliveryRate);
  }

  async ordersProfit(request: Request, response: Response) {
    const initial = startOfHour(new Date());
    const final = endOfHour(new Date());

    const ordersProfit = await Order.find({ createdAt: { $gte: initial, $lte: final } })
      .populate('items.product')
      .populate('deliveryman');

    const totalOrders = ordersProfit.reduce((sum, order) => {
      return sum + order.total;
    }, 0);

    const totalRate = ordersProfit.reduce((sum, order) => {
      return sum + order.address.district_rate;
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

    return response.json({ orders: ordersProfit, total: totalOrders, netValue: filteredTotal });
  }

  async productsDispenseAndGain(request: Request, response: Response) {
    const orders = await Order.aggregate<InterfaceDispenseAndGain>()
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
      });

    const productDispenseAndGain = orders.map((order) => {
      return {
        ...order,
        dispense: order._id?.cost * (order._id.stock ? order._id.stock : 0),
      };
    });
    return response.json(productDispenseAndGain);
  }

  async productsAmount(request: Request, response: Response) {
    const productsAmount = await Order.aggregate()
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
