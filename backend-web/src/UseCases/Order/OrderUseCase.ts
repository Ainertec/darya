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

    if (!address.district) throw Error('That district does not exist');

    const addressToSend = {
      client_address_id: address._id,
      district_id: address.district._id,
      district_name: address.district.name,
      district_rate: address.district.rate,
      street: address.street,
      number: address.number,
      reference: address.reference,
    };

    let totalProducts = address.district.rate ? address.district.rate : 0;

    await Promise.all(
      data.items.map(async item => {
        const product = await this.repository.findProductId(item.product);
        if (product) {
          totalProducts += product.price * item.quantity;
        }
      }),
    );
    const order = await this.repository.save({
      identification,
      items: data.items,
      note: data.note,
      addressToSend,
      total: totalProducts,
      client: {
        client_id: clientId,
        name: client.name,
        phone: client.phone,
      },
      source: 'site',
    });

    return order;
  }
}
