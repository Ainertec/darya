import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Client from '../../src/app/models/Client';
import Order from '../../src/app/models/Order';
import app from '../../src/app';
import factory from '../factories';

import {
  OrderInterface,
  DistrictInterface,
  ClientInterface,
  DeliverymanInterface,
  ProductInterface,
} from '../../src/interfaces/base';

describe('should a Client', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Client.deleteMany({});
  });

  it('should create an order', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        client_id: client._id,
        deliveryman: deliveryman._id,
        client_address_id: client.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      });
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  // it('should not create an order with invalid source', async () => {
  //   const client = await factory.create<ClientInterface>('Client');
  //   const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
  //   const district = await factory.create<DistrictInterface>('District');
  //   const products = await factory.create<ProductInterface>('Product');

  //   const response = await request(app)
  //     .post('/orders')
  //     .send({
  //       client: client._id,
  //       deliveryman: deliveryman._id,
  //       district: district._id,
  //       client_address_id: client.address[0]._id,
  //       items: [
  //         {
  //           product: products._id,
  //           quantity: 5,
  //         },
  //       ],
  //       source: 'nada',
  //     });

  //   expect(response.status).toBe(400);
  // });

  // it('should update an order', async () => {
  //   const order = await factory.create<OrderInterface>('Order');
  //   const client = await factory.create<ClientInterface>('Client');
  //   const product = await factory.create<ProductInterface>('Product', {
  //     name: 'Chocolate',
  //   });

  //   const response = await request(app)
  //     .put(`/orders/${order._id}`)
  //     .send({
  //       client: client._id,
  //       deliveryman: order.deliveryman,
  //       client_address_id: client.address[0]._id,
  //       district: order.district,
  //       note: order.note,
  //       total: 100,
  //       source: 'Instagram',
  //       finished: true,
  //       items: [
  //         {
  //           product: product._id,
  //           quantity: 12,
  //         },
  //       ],
  //     });

  //   expect(response.status).toBe(200);
  //   // expect(response.body).toEqual(
  //   //   expect.objectContaining({
  //   //     client: {
  //   //       _id: client._id,
  //   //     },
  //   //   })
  //   // );
  // });

  // it('should delete an order', async () => {
  //   const order = await factory.create<OrderInterface>('Order');

  //   const response = await request(app).delete(`/orders/${order._id}`);

  //   expect(response.status).toBe(200);
  // });

  // it('should list all orders', async () => {
  //   const client = await factory.create<ClientInterface>('Client');
  //   const order = await factory.createMany<OrderInterface>('Order', 3, {
  //     client: client._id,
  //     client_address_id: client.address[0]._id,
  //   });

  //   const response = await request(app).get(`/orders`);
  //   console.log(response.body);
  //   expect(response.status).toBe(200);
  // });
});
