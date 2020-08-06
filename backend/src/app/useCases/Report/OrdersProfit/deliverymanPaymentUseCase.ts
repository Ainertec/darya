import { Model, Types } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../../../interfaces/base';

export class DeliverymanPaymentUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute(deliveryman_id: string) {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());
    const ObjectId = Types.ObjectId;

    const deliveryRate = await this.OrderModel.aggregate()
      .match({
        deliveryman: ObjectId(deliveryman_id),
        createdAt: { $gte: initial, $lte: final },
        finished: true,
      })
      .group({
        _id: '$deliveryman',
        rate: { $sum: '$address.district_rate' },
      });

    return deliveryRate;
  }
}
