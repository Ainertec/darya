import { Request, Response, response } from 'express';
import { Types } from 'mongoose';
import crypto from 'crypto';
import Order, { Source } from '../models/Order';
import Client from '../models/Client';
import District from '../models/District';
import Deliveryman from '../models/Deliveryman';
import { OrderInterface, ItemsInterface } from '../../interfaces/base';
import Product from '../models/Product';

class OrderController {
  public constructor() {
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  private async getTotal(items: ItemsInterface[], rate: number) {
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

  private async addOrUpdateAddress(
    order: OrderInterface,
    client_id: Types.ObjectId,
    client_address_id: Types.ObjectId
  ) {
    const client = await Client.findOne({ _id: client_id });

    if (!client) return 'That client does not exist';

    const address = client.address.find((add) => add._id == client_address_id);

    if (!address) return 'That address does not exist';

    const district = await District.findOne({ _id: address.district });

    if (!district) return 'That district does not exist';
    order.address = {
      client_address_id: address._id,
      district_id: district._id,
      district_name: district.name,
      district_rate: district.rate,
      street: address.street,
      number: address.number,
      reference: address.reference,
    };
  }

  private async addOrUpdateClient(order: OrderInterface, client_id: Types.ObjectId) {
    const client = await Client.findOne({ _id: client_id });

    if (!client) return 'That client does not exist';
    order.client = {
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
    const order = await Order.findOne({ identification: identification })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(order);
  }

  async showByDeliveryman(request: Request, response: Response) {
    const { deliveryman } = request.params;
    const ObjectId = Types.ObjectId;
    const order = await Order.find({
      deliveryman: ObjectId(deliveryman),
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
    const address = client.address.find((add) => add._id == client_address_id);
    if (!address) return response.status(400).json('That address does not exist');
    const district = await District.findOne({ _id: address.district });
    if (!district) return response.status(400).json('That district does not exist');

    const identification =
      crypto.randomBytes(4).toString('hex') + client.phone[0].slice(client.phone[0].length - 2);
    const total = await this.getTotal(items, district.rate);
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
      total: total,
    });

    await order.populate('deliveryman').populate('items.product').execPopulate();

    const deliverymanPersisted = await Deliveryman.findOne({ _id: deliveryman });

    if (!deliverymanPersisted) {
      return response.status(400).json('Invalid deliveryman');
    }
    deliverymanPersisted.hasDelivery = true;
    await deliverymanPersisted.save();

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
      finished,
    } = request.body;
    const { id } = request.params;

    const order = await Order.findOne({ _id: id });

    if (!order) return response.status(400).json('Order does not exist');

    if (identification) order.identification = identification;
    if (items) {
      order.items = items;
      order.total = await this.getTotal(items, order.address.district_rate);
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
      const error = await this.addOrUpdateClient(order, client_id);
      if (error) {
        return response.status(400).json(error);
      }
    }
    if (
      client_address_id &&
      String(order.address.client_address_id) !== String(client_address_id)
    ) {
      const error = await this.addOrUpdateAddress(order, order.client.client_id, client_address_id);
      order.total = await this.getTotal(order.items, order.address.district_rate);
      if (error) {
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
