"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoOrderRepository = void 0;
class MongoOrderRepository {
    constructor(orderModel, productModel, clientModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.clientModel = clientModel;
    }
    async save(arg) {
        const order = await this.orderModel.create(arg);
        await order.populate('items.product').execPopulate();
        return order;
    }
    async findClientId(id) {
        const client = await this.clientModel.findOne({ _id: id });
        await client.populate('address.district').execPopulate();
        return client;
    }
    async findProductId(id) {
        const product = await this.productModel.findOne({ _id: id });
        return product;
    }
}
exports.MongoOrderRepository = MongoOrderRepository;
