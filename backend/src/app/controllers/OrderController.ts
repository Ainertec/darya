/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import crypto from 'crypto';
import Order, { Source } from '../models/Order';
import User from '../models/User';
import District from '../models/District';
import Deliveryman from '../models/Deliveryman';
import { Items } from '../../interfaces/base';
import Product from '../models/Product';

class OrderController {
  public constructor() {
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  private async getTotal(items: Items[], rate: number) {
    let totalProducts = 0;
    await Promise.all(
      items.map(async item => {
        const product = await Product.findOne({ _id: item.product });
        if (product) {
          totalProducts += product.price * item.quantity;
        }
      }),
    );

    return totalProducts + rate;
  }

  private async getAddress(
    user_id: Types.ObjectId,
    user_address_id: Types.ObjectId,
  ) {
    const user = await User.findOne({ _id: user_id });

    if (!user) throw Error('That user does not exist');

    const address = user.address?.find(
      add => String(add._id) === String(user_address_id),
    );

    if (!address) throw Error('That address does not exist');

    const district = await District.findOne({ _id: address.district });

    if (!district) throw Error('That district does not exist');

    return {
      user_address_id: address._id,
      district_id: district._id,
      district_name: district.name,
      district_rate: district.rate,
      street: address.street,
      number: address.number,
      reference: address.reference,
    };
  }

  private async getUser(user_id: Types.ObjectId) {
    const user = await User.findOne({ _id: user_id });

    if (!user) throw Error('That user does not exist');
    return {
      user_id,
      name: user.name,
      phone: user.phone,
    };
  }

  async index(request: Request, response: Response) {
    const orders = await Order.find({ finished: false })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(orders);
  }

  async showByUser(request: Request, response: Response) {
    const { userId } = request;
    const orders = await Order.find({
      finished: false,
      'user.user_id': userId,
    })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(orders);
  }

  async show(request: Request, response: Response) {
    const { identification } = request.params;
    const order = await Order.findOne({
      identification,
      finished: false,
    })
      .populate('deliveryman')
      .populate('items.product');

    return response.json(order);
  }

  async showByDeliveryman(request: Request, response: Response) {
    const { deliveryman } = request.params;
    const { ObjectId } = Types;

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
      user_id,
      deliveryman,
      user_address_id,
      items,
      source,
      note,
      payment,
      viewed,
    } = request.body;
    const authUserId = request.userId;

    const isValidSource = Source.getSource().includes(source);

    if (!isValidSource) {
      return response.status(400).json({ message: 'invalid source' });
    }

    const authUser = await User.findOne({ _id: authUserId });

    const user = authUser?.admin
      ? await User.findOne({ _id: user_id })
      : authUser;
    const address_id = authUser?.admin
      ? user_address_id
      : authUser.address[0]?._id;

    if (!user) return response.status(400).json('That user does not exist');

    const identification =
      user.phone && user.phone?.length > 0
        ? crypto.randomBytes(4).toString('hex') +
          user.phone[0].slice(user.phone[0].length - 2)
        : crypto.randomBytes(4).toString('hex');

    try {
      const address = address_id
        ? await this.getAddress(user._id, address_id)
        : undefined;

      const total = address
        ? await this.getTotal(items, address.district_rate)
        : await this.getTotal(items, 0);

      const order = await Order.create({
        identification,
        user: {
          user_id: user._id,
          name: user.name,
          phone: user.phone,
        },
        address,
        items,
        source,
        note,
        payment,
        total,
        viewed,
      });

      if (deliveryman) {
        const deliverymanPersisted = await Deliveryman.findOne({
          _id: deliveryman,
        });

        if (!deliverymanPersisted) {
          return response.status(400).json('Invalid deliveryman');
        }
        deliverymanPersisted.hasDelivery = true;
        await deliverymanPersisted.save();
        order.deliveryman = deliveryman;
        await order.save();
      }

      await order
        .populate('deliveryman')
        .populate('items.product')
        .execPopulate();
      return response.json(order);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async update(request: Request, response: Response) {
    const {
      user_id,
      deliveryman,
      identification,
      user_address_id,
      items,
      source,
      note,
      payment,
      finished,
      viewed,
    } = request.body;
    const { id } = request.params;

    const order = await Order.findOne({ _id: id });

    if (!order) return response.status(400).json('Order does not exist');

    if (identification) order.identification = identification;
    if (items) {
      order.items = items;
      order.total = await this.getTotal(
        items,
        order.address?.district_rate || 0,
      );
    }
    if (source) order.source = source;
    if (deliveryman) order.deliveryman = deliveryman;

    if (note) order.note = note;
    if (payment) order.payment = payment;
    if (viewed) order.viewed = viewed;

    if (finished) {
      const deliverymanPersisted = await Deliveryman.findOne({
        _id: order.deliveryman,
      });

      if (deliverymanPersisted) {
        deliverymanPersisted.available = false;
        deliverymanPersisted.hasDelivery = false;
        await deliverymanPersisted.save();
      }
      order.finished = true;
    }

    if (user_id && String(order.user.user_id) !== String(user_id)) {
      try {
        const user = await this.getUser(user_id);
        order.user = user;
      } catch (error) {
        return response.status(400).json(error);
      }
    }
    if (
      user_address_id &&
      String(order.address?.user_address_id) !== String(user_address_id)
    ) {
      try {
        const address = await this.getAddress(
          order.user.user_id,
          user_address_id,
        );
        order.address = address;
        order.total = await this.getTotal(
          order.items,
          order.address?.district_rate || 0,
        );
      } catch (error) {
        return response.status(400).json(error);
      }
    }

    await order.save();
    await order
      .populate('deliveryman')
      .populate('items.product')
      .execPopulate();

    return response.json(order);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Order.deleteOne({ _id: id });
    return response.status(200).send();
  }
}

export default new OrderController();
