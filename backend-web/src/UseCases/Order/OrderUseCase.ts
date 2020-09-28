import crypto from 'crypto';
import { IOrderRepository } from '../../Repositories/IOrderRepository';
import { ICreateOrderRequest } from './orderDTO';

export class OrderUseCase {
  constructor(private repository: IOrderRepository) {}

  async createOrder(data: ICreateOrderRequest, clientId: string) {
    const client = await this.repository.findClientId(clientId);

    const identification =
      client.phone && client.phone?.length > 0
        ? crypto.randomBytes(4).toString('hex') +
          client.phone[0].slice(client.phone[0].length - 2)
        : crypto.randomBytes(4).toString('hex');

    const address = client.address?.find(
      add => String(add._id) === String(data.client_address_id),
    );

    if (!address) throw Error('That address does not exist');

    // const district = await District.findOne({ _id: address.district });

    if (!address.district) throw Error('That district does not exist');

    const addressTOSend = {
      client_address_id: address._id,
      district_id: address.district._id,
      district_name: address.district.name,
      district_rate: address.district.rate,
      street: address.street,
      number: address.number,
      reference: address.reference,
    };
  }
  // let totalProducts = 0;
  // await Promise.all(
  //   items.map(async item => {
  //     const product = await Product.findOne({ _id: item.product });
  //     if (product) {
  //       totalProducts += product.price * item.quantity;
  //     }
  //   }),
  // );
}
