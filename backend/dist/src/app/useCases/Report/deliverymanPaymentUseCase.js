"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverymanPaymentUseCase = void 0;
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const mongoose_1 = require("mongoose");
const date_fns_1 = require("date-fns");
class DeliverymanPaymentUseCase {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async execute(deliveryman_id) {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const { ObjectId } = mongoose_1.Types;
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
            deliveryman: ordersDeliveryman[0]
                .deliveryman,
        };
    }
}
exports.DeliverymanPaymentUseCase = DeliverymanPaymentUseCase;
