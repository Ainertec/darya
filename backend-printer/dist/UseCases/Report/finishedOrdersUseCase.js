"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishedOrdersUseCase = void 0;
/* eslint-disable camelcase */
const mongoose_1 = require("mongoose");
const date_fns_1 = require("date-fns");
class FinishedOrdersUseCase {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async execute(deliveryman_id) {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const { ObjectId } = mongoose_1.Types;
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
exports.FinishedOrdersUseCase = FinishedOrdersUseCase;
