/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Model, Types } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../../interfaces/base';

interface IDeliveryman {
  name: string;
  phone: string;
}

export class DeliverymanPaymentUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute(deliveryman_id: string) {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());
    const { ObjectId } = Types;

    const ordersDeliveryman = await this.OrderModel.find({
      deliveryman: ObjectId(deliveryman_id),
      createdAt: { $gte: initial, $lte: final },
      finished: true,
    })
      .populate('items.product')
      .populate('deliveryman');

    if (ordersDeliveryman.length === 0) {
      return;
    }

    const deliverymanRate = ordersDeliveryman.reduce((sum, order) => {
      return sum + order.address.district_rate;
    }, 0);
    const deliverymanAddress = ordersDeliveryman.map(order => order.address);

    return {
      deliverymanAddress,
      deliverymanRate: deliverymanRate.toFixed(2),
      deliveryman: (ordersDeliveryman[0]
        .deliveryman as unknown) as IDeliveryman,
    };
  }
}
