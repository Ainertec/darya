import { Request, Response } from 'express';
import Order from '../models/Order';
import { Source } from '../models/Order';
import Client from '../models/Client';
import District from '../models/District';

class OrderController {
  // async index(request: Request, response: Response) {
  //   // const orders = await Order.aggregate().lookup({
  //   //   from: 'client',
  //   //   localField: 'client',
  //   //   foreignField: '_id',
  //   //   as: 'clientn',
  //   // }).unwind('clientn')
  //   // .project({
  //   //   '$clientn.address':
  //   // })
  //   const orders = await Order.find()
  //     .populate('deliveryman')
  //     .populate('district')
  //     .populate('items.product')
  //     .populate('client');

  //   const ordersSerializaded = orders.map((order) => {
  //     if (order.client) {
  //       const newAddress = order.client.address.find(
  //         (addre) => addre._id == order.client_address_id
  //       );
  //       console.log('client address', order.client.address);
  //       console.log('pa gringo é mais caro', newAddress);
  //       const newClient = { ...order.client.toObject(), address: newAddress };

  //       return {
  //         ...order.toObject(),
  //         client: newClient,
  //       };
  //     }
  //   });

  //   return response.json(ordersSerializaded);
  // }

  async store(request: Request, response: Response) {
    const {
      client_id,
      deliveryman,
      client_address_id,
      items,
      source,
      note,
      payment,
    } = request.body;

    const isValidSource = Source.getSource().includes(source);

    if (!isValidSource) {
      return response.status(400).json({ message: 'invalid source' });
    }

    const client = await Client.findOne({ _id: client_id });
    if (!client) return response.status(400).json('That client does not exist');
    const address = client.address.find((add) => add._id == client_address_id);
    if (!address) return response.status(400).json('That address does not exist');
    const district = await District.findOne({ _id: address?.district });
    if (!district) return response.status(400).json('That district does not exist');

    const order = await Order.create({
      client: {
        client_id: client_id,
        name: client.name,
        phone: client.phone,
      },
      deliveryman,
      address: {
        client_address_id: address._id,
        district_id: district._id,
        district_name: district.name,
        district_rate: district.rate,
        street: address.street,
        number: address.number,
        reference: address.reference,
      },
      items,
      source,
      note,
      payment,
    });

    await order.populate('deliveryman').populate('items.product').execPopulate();

    return response.json(order);
  }

  // async update(request: Request, response: Response) {
  //   const {
  //     client,
  //     deliveryman,
  //     district,
  //     client_address_id,
  //     items,
  //     source,
  //     note,
  //     finished,
  //     payment,
  //   } = request.body;
  //   const { id } = request.params;

  //   const order = await Order.findOneAndUpdate(
  //     { _id: id },
  //     {
  //       client,
  //       deliveryman,
  //       district,
  //       client_address_id,
  //       items,
  //       source,
  //     },
  //     { new: true }
  //   );

  //   if (!order) return response.status(400).json('Order does not exist');
  //   if (finished) order.finished = finished;
  //   if (note) order.note = note;
  //   if (payment) order.payment = payment;

  //   await order.save();
  //   await order
  //     .populate('deliveryman')
  //     .populate('district')
  //     .populate('items.product')
  //     .populate('client')
  //     .populate({
  //       path: 'client',
  //       match: { 'address._id': client_address_id },
  //       // select: 'address phone name ',
  //     })
  //     .execPopulate();

  //   return response.json(order);
  // }

  // async delete(request: Request, response: Response) {
  //   const { id } = request.params;

  //   const order = await Order.deleteOne({ _id: id });
  //   return response.status(200).send();
  // }
}

export default new OrderController();
