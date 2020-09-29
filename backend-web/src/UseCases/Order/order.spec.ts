/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { closeConnection, openConnection } from '../../utils/connection';
import { IClientDocument } from '../../Entity/Client';
import app from '../../app';
import factory from '../../utils/factories';
import { Order } from '../../Entity/Order';
import { IProductDocument } from '../../Entity/Product';

describe('Order tests', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
  });

  it('should create a order', async () => {
    const client = await factory.create<IClientDocument>('Client');
    const product = await factory.create<IProductDocument>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        items: [
          {
            product: product._id,
            quantity: 5,
          },
        ],
        note: 'com muzarela',
        client_address_id: client?.address[0]._id,
      })
      .set('Authorization', `Bearer ${client.generateToken()}`);
    // console.log(response.body);
    expect(response.status).toBe(201);
  });
});
