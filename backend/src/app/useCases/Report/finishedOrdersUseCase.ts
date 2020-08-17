/* eslint-disable camelcase */
import { Model, Types } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../../interfaces/base';

export class FinishedOrdersUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute(deliveryman_id: string) {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());
    const { ObjectId } = Types;

    const orders = await this.OrderModel.find({
      deliveryman: ObjectId(deliveryman_id),
      createdAt: { $gte: initial, $lte: final },
      finished: true,
    })
      .populate('deliveryman')
      .populate('items.product');

    return orders;
  }
}
