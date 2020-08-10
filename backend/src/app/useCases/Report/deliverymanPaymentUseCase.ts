import { Model, Types } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../../interfaces/base';
import { order } from '../../../validations/orderSchema';

export class DeliverymanPaymentUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute(deliveryman_id: string) {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());
    const ObjectId = Types.ObjectId;

    const ordersDeliveryman = await this.OrderModel.find({
      deliveryman: ObjectId(deliveryman_id),
      createdAt: { $gte: initial, $lte: final },
      finished: true,
    })
      .populate('items.product')
      .populate('deliveryman');

    const deliverymanRate = ordersDeliveryman.reduce((sum, order) => {
      return sum + order.address.district_rate;
    }, 0);

    return {
      ordersDeliveryman,
      deliverymanRate,
    };
  }
}
