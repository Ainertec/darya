import { Request, Response } from 'express';
import Order from '../models/Order';

class OrderController {
  async store(request: Request, response: Response) {
    const { client, deliveryman, district, client_address_id, items, source, note } = request.body;

    const order = await Order.create({
      client,
      deliveryman,
      district,
      client_address_id,
      items,
      source,
      note,
    });

    await order
      .populate('deliveryman')
      .populate('district')
      .populate('items.product')
      .populate({
        path: 'client',
        match: { 'address._id': client_address_id },
      })
      .execPopulate();

    return response.json(order);
  }

  async update(request: Request, response: Response) {
    const {
      client,
      deliveryman,
      district,
      client_address_id,
      items,
      source,
      note,
      finished,
    } = request.body;
    const { id } = request.params;

    const order = await Order.findOneAndUpdate(
      { _id: id },
      {
        client,
        deliveryman,
        district,
        client_address_id,
        items,
        source,
      },
      { new: true }
    );

    if (!order) return response.status(400).json('Order does not exist');
    if (finished) order.finished = finished;
    if (note) order.note = note;

    await order.save();
    await order
      .populate('deliveryman')
      .populate('district')
      .populate('items.product')
      .populate('client')
      .populate({
        path: 'client',
        match: { 'address._id': client_address_id },
        // select: 'address phone name ',
      })
      .execPopulate();

    return response.json(order);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const order = await Order.deleteOne({ _id: id });
    return response.status(200).send();
  }
}
// validar enum

export default new OrderController();
