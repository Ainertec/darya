import { Request, Response } from 'express';
import crypto from 'crypto';
import Order from '../models/Order';
import { Source } from '../models/Order';
import Client from '../models/Client';
import District from '../models/District';
import Deliveryman from '../models/Deliveryman';

class OrderController {
  async index(request: Request, response: Response) {
    const orders = await Order.find({ finished: false })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(orders);
  }
  // deliveryman

  async show(request: Request, response: Response) {
    const { identification } = request.params;
    const order = await Order.findOne({ identification: identification })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(order);
  }

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

    const identification =
      crypto.randomBytes(4).toString('hex') + client.phone[0].slice(client.phone[0].length - 2);

    const order = await Order.create({
      identification,
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
      total: 20,
    });

    await order.populate('deliveryman').populate('items.product').execPopulate();

    return response.json(order);
  }

  async update(request: Request, response: Response) {
    const {
      client_id,
      deliveryman,
      identification,
      client_address_id,
      items,
      source,
      note,
      payment,
    } = request.body;
    const { id } = request.params;

    const order = await Order.findOne({ _id: id });

    if (!order) return response.status(400).json('Order does not exist');

    order.identification = identification;

    if (note) order.note = note;

    if (payment) {
      const deliverimanPerdisted = await Deliveryman.findOne({ _id: deliveryman });

      if (!deliverimanPerdisted) return response.status(400).json('Invalid deliveryman');
      deliverimanPerdisted.avaliable = false;

      await deliverimanPerdisted.save();
      order.payment = payment;
      order.finished = true;
    }

    order.items = items;
    order.source = source;
    order.deliveryman = deliveryman;

    if (
      String(order.client.client_id) !== String(client_id) ||
      String(order.address.client_address_id) !== String(client_address_id)
    ) {
      const client = await Client.findOne({ _id: client_id });

      if (!client) return response.status(400).json('That client does not exist');

      const address = client.address.find((add) => add._id == client_address_id);

      if (!address) return response.status(400).json('That address does not exist');

      const district = await District.findOne({ _id: address.district });

      if (!district) return response.status(400).json('That district does not exist');
      (order.address = {
        client_address_id: address._id,
        district_id: district._id,
        district_name: district.name,
        district_rate: district.rate,
        street: address.street,
        number: address.number,
        reference: address.reference,
      }),
        (order.client = {
          client_id: client_id,
          name: client.name,
          phone: client.phone,
        });
    }

    await order.save();
    await order.populate('deliveryman').populate('items.product').execPopulate();

    return response.json(order);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Order.deleteOne({ _id: id });
    return response.status(200).send();
  }
}

export default new OrderController();
