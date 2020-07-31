import { Request, Response, response } from 'express';
import { Types } from 'mongoose';
import crypto from 'crypto';
import Order, { Source } from '../models/Order';
import Client from '../models/Client';
import District from '../models/District';
import Deliveryman from '../models/Deliveryman';
import { OrderInterface, Items } from '../../interfaces/base';
import Product from '../models/Product';

class OrderController {
  public constructor() {
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  private async getTotal(items: Items[], rate: number) {
    let totalProducts = 0;
    await Promise.all(
      items.map(async (item) => {
        const product = await Product.findOne({ _id: item.product });
        if (product) {
          totalProducts += product.price * item.quantity;
        }
      })
    );

    return totalProducts + rate;
  }

  private async getAddress(client_id: Types.ObjectId, client_address_id: Types.ObjectId) {
    const client = await Client.findOne({ _id: client_id });

    if (!client) throw Error('That client does not exist');

    const address = client.address?.find((add) => add._id == client_address_id);

    if (!address) throw Error('That address does not exist');

    const district = await District.findOne({ _id: address.district });

    if (!district) throw Error('That district does not exist');

    return {
      client_address_id: address._id,
      district_id: district._id,
      district_name: district.name,
      district_rate: district.rate,
      street: address.street,
      number: address.number,
      reference: address.reference,
    };
  }

  private async getClient(client_id: Types.ObjectId) {
    const client = await Client.findOne({ _id: client_id });

    if (!client) throw Error('That client does not exist');
    return {
      client_id: client_id,
      name: client.name,
      phone: client.phone,
    };
  }

  async index(request: Request, response: Response) {
    const orders = await Order.find({ finished: false })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(orders);
  }

  async show(request: Request, response: Response) {
    const { identification } = request.params;
    const order = await Order.findOne({ identification: identification, finished: false })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(order);
  }

  async showByDeliveryman(request: Request, response: Response) {
    const { deliveryman } = request.params;
    const ObjectId = Types.ObjectId;

    const order = await Order.find({
      deliveryman: ObjectId(deliveryman),
      finished: false,
    })
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

    const identification =
      client.phone && client.phone?.length > 0
        ? crypto.randomBytes(4).toString('hex') + client.phone[0].slice(client.phone[0].length - 2)
        : crypto.randomBytes(4).toString('hex');

    try {
      const address = client_address_id
        ? await this.getAddress(client_id, client_address_id)
        : undefined;

      const total = address
        ? await this.getTotal(items, address.district_rate)
        : await this.getTotal(items, 0);

      const order = await Order.create({
        identification,
        client: {
          client_id: client_id,
          name: client.name,
          phone: client.phone,
        },
        address,
        items,
        source,
        note,
        payment,
        total,
      });

      if (deliveryman) {
        const deliverymanPersisted = await Deliveryman.findOne({ _id: deliveryman });

        if (!deliverymanPersisted) {
          return response.status(400).json('Invalid deliveryman');
        }
        deliverymanPersisted.hasDelivery = true;
        await deliverymanPersisted.save();
        order.deliveryman = deliveryman;
        await order.save();
      }

      await order.populate('deliveryman').populate('items.product').execPopulate();
      return response.json(order);
    } catch (error) {
      return response.status(400).json(error);
    }
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
      finished,
    } = request.body;
    const { id } = request.params;

    const order = await Order.findOne({ _id: id });

    if (!order) return response.status(400).json('Order does not exist');

    if (identification) order.identification = identification;
    if (items) {
      order.items = items;
      order.total = await this.getTotal(items, order.address?.district_rate || 0);
    }
    if (source) order.source = source;
    if (deliveryman) order.deliveryman = deliveryman;

    if (note) order.note = note;
    if (payment) order.payment = payment;

    if (finished) {
      const deliverymanPersisted = await Deliveryman.findOne({ _id: order.deliveryman });

      if (!deliverymanPersisted) return response.status(400).json('Invalid deliveryman');
      deliverymanPersisted.available = false;
      deliverymanPersisted.hasDelivery = false;

      await deliverymanPersisted.save();
      order.finished = true;
    }
    if (client_id && String(order.client.client_id) !== String(client_id)) {
      try {
        const client = await this.getClient(client_id);
        order.client = client;
      } catch (error) {
        return response.status(400).json(error);
      }
    }
    if (
      client_address_id &&
      String(order.address?.client_address_id) !== String(client_address_id)
    ) {
      try {
        const address = await this.getAddress(order.client.client_id, client_address_id);
        order.address = address;
        order.total = await this.getTotal(order.items, order.address?.district_rate || 0);
      } catch (error) {
        return response.status(400).json(error);
      }
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
