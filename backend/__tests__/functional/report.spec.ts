import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
// import Client from '../../src/app/models/Client';
import Order from '../../src/app/models/Order';
import Deliveryman from '../../src/app/models/Deliveryman';
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
    // await Deliveryman.deleteMany({});
    await Order.deleteMany({});
  });

  it('should list a deliveryman payment by period', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      name: 'Gustavo',
    });
    await factory.createMany<OrderInterface>('Order', 3, {
      deliveryman: deliveryman._id,
    });

    const response = await request(app)
      .get('/reports/deliveryman/rate')
      .query({
        deliveryman_id: String(deliveryman._id),
      });

    expect(response.status).toBe(200);
  });

  it('should not list a deliveryman payment of another days', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      name: 'Gustavo',
    });
    await factory.createMany<OrderInterface>('Order', 3, {
      deliveryman: deliveryman._id,
      createdAt: new Date(2020, 6, 12),
    });

    const response = await request(app)
      .get('/reports/deliveryman/rate')
      .query({
        deliveryman_id: String(deliveryman._id),
      });
    expect(response.body.length).toBe(0);
    expect(response.status).toBe(200);
  });

  it('should list a total profit of the day orders', async () => {
    const product = await factory.create<ProductInterface>('Product', {
      cost: 10,
    });
    await factory.createMany('Order', 5, {
      total: 200,
      items: [{ product: product._id, quantity: 1 }],
    });

    const response = await request(app).get('/reports/orders/profit');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        total: 1000,
      })
    );
    expect(response.body).toHaveProperty('netValue');
  });
});
