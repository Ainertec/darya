import { Client, IClientDocument } from '../../Entity/Client';
import { Order, IOrderDocument } from '../../Entity/Order';
import { IProductDocument, Product } from '../../Entity/Product';
import { IOrderRepository, IOrderSaveRequest } from '../IOrderRepository';

export class MongoOrderRepository implements IOrderRepository {
  constructor(
    private orderModel: typeof Order,
    private productModel: typeof Product,
    private clientModel: typeof Client,
  ) {}

  async save(arg: IOrderSaveRequest): Promise<IOrderDocument> {
    const order = await this.orderModel.create(arg);
    await order.populate('items.product').execPopulate();
    return order;
  }

  async findClientId(id: string): Promise<IClientDocument> {
    const client = await this.clientModel.findOne({ _id: id });
    await client.populate('address.district').execPopulate();
    return client;
  }

  async findProductId(id: string): Promise<IProductDocument> {
    const product = await this.productModel.findOne({ _id: id });
    return product;
  }
}
