import request from 'supertest';
import { sub } from 'date-fns';
import { closeConnection, openConnection } from '../utils/connection';
import Order from '../../src/app/models/Order';
import app from '../../src/app';
import factory from '../factories';

import {
  OrderInterface,
  DeliverymanInterface,
  ProductInterface,
} from '../../src/interfaces/base';
import { IUserDocument } from '../../src/app/models/User';

describe('Reports test', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
  });

  it('should list a deliveryman payment by period', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'Gustavo',
      },
    );
    await factory.createMany<OrderInterface>('Order', 3, {
      deliveryman: deliveryman._id,
      finished: true,
    });

    const response = await request(app)
      .get(`/reports/deliveryman/rate/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should list all finished orders by deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'Gustavo',
      },
    );
    await factory.createMany<OrderInterface>('Order', 3, {
      deliveryman: deliveryman._id,
      finished: true,
    });

    const response = await request(app)
      .get(`/reports/deliveryman/orders/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should not list a deliveryman payment of another days', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'Gustavo',
      },
    );
    await factory.createMany<OrderInterface>('Order', 3, {
      deliveryman: deliveryman._id,
      createdAt: new Date(2020, 6, 12),
      finished: true,
    });

    const response = await request(app)
      .get(`/reports/deliveryman/rate/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });

  it('should list a total profit of the day orders', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const product = await factory.create<ProductInterface>('Product');
    await factory.createMany('Order', 5, {
      total: 200,
      items: [{ product: product._id, quantity: 1 }],
      finished: true,
    });
    const total = 1000;
    const response = await request(app)
      .get('/reports/orders/profit')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        total: total.toFixed(2),
      }),
    );
    expect(response.body).toHaveProperty('netValue');
  });

  it('should list dispense and gain of all products', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const product = await factory.create<ProductInterface>('Product', {
      cost: 10,
    });
    const product1 = await factory.create<ProductInterface>('Product');
    const product2 = await factory.create<ProductInterface>('Product');
    const product3 = await factory.create<ProductInterface>('Product');
    await factory.createMany('Order', 2, {
      items: [
        {
          product: product._id,
          quantity: 3,
        },
        {
          product: product1._id,
          quantity: 2,
        },
      ],
      finished: true,
    });
    await factory.createMany('Order', 2, {
      items: [
        {
          product: product2._id,
          quantity: 4,
        },
      ],
      finished: true,
    });
    await factory.createMany('Order', 2, {
      items: [
        {
          product: product3._id,
          quantity: 3,
        },
        {
          product: product1._id,
          quantity: 2,
        },
      ],
      finished: true,
    });
    const total = 60;
    const response = await request(app)
      .get('/reports/products/dispense_gain')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dispense: total.toFixed(2),
        }),
      ]),
    );
  });

  it('should list an amount of all products', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const product = await factory.create<ProductInterface>('Product', {
      cost: 10,
    });
    const product1 = await factory.create<ProductInterface>('Product');
    const product2 = await factory.create<ProductInterface>('Product');
    const product3 = await factory.create<ProductInterface>('Product');
    await factory.createMany('Order', 2, {
      items: [
        {
          product: product._id,
          quantity: 3,
        },
        {
          product: product1._id,
          quantity: 2,
        },
      ],
      finished: true,
    });
    await factory.createMany('Order', 2, {
      items: [
        {
          product: product2._id,
          quantity: 4,
        },
      ],
      finished: true,
    });
    await factory.createMany('Order', 2, {
      items: [
        {
          product: product3._id,
          quantity: 3,
        },
        {
          product: product1._id,
          quantity: 2,
        },
      ],
      finished: true,
    });

    const response = await request(app)
      .get('/reports/products/amount')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          amount: 8,
        }),
      ]),
    );
  });

  it('should delete finished order with more than 2 years', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    await factory.createMany('Order', 3, {
      createdAt: sub(new Date(), { years: 2 }),
      finished: true,
    });
    await factory.create('Order');

    const response = await request(app)
      .delete('/reports')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const sales = await Order.find().countDocuments();
    expect(response.status).toBe(200);
    expect(sales).toBe(1);
  });
});
