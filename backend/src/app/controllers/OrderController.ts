import { Request, Response } from 'express';
import Order from '../models/Order';

class OrderController {
  async store(request: Request, response: Response) {
    const { client, deliveryman, district, client_address_id, items, source } = request.body;

    const order = await Order.create({
      client,
      deliveryman,
      district,
      client_address_id,
      items,
      source,
    });

    await order
      .populate('deliveryman')
      .populate('district')
      .populate('items')
      .populate({
        path: 'client',
        match: { 'address._id': client_address_id },
        select: 'address phone name ',
      })
      .execPopulate();

    console.log(order.toObject());

    return response.json(order);
  }
}

export default new OrderController();
