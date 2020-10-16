/* eslint-disable no-unneeded-ternary */
import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import User, { IUserDocument } from '../../src/app/models/User';
import Order from '../../src/app/models/Order';
import Deliveryman from '../../src/app/models/Deliveryman';
import app from '../../src/app';
import factory from '../factories';

import {
  OrderInterface,
  DistrictInterface,
  DeliverymanInterface,
  ProductInterface,
} from '../../src/interfaces/base';

describe('should a User', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
    await Deliveryman.deleteMany({});
    await Order.deleteMany({});
  });

  it('should create an order', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const use2 = await factory.create<IUserDocument>('User', {
      admin: true,
      name: 'Cleiton',
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    const products = await factory.create<ProductInterface>('Product', {
      price: 10,
    });

    const response = await request(app)
      .post('/orders')
      .send({
        user_id: user._id,
        deliveryman: deliveryman._id,
        user_address_id: user.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
        viewed: false,
      })
      .set('Authorization', `Bearer ${use2.generateToken()}`);

    expect(response.body.user.name).toEqual(user.name);
    expect(response.body).toHaveProperty('total');
    expect(response.status).toBe(200);
  });

  it('should create an order with authenticated user', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: false });
    const use2 = await factory.create<IUserDocument>('User', {
      admin: false,
      name: 'Cleiton',
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    const products = await factory.create<ProductInterface>('Product', {
      price: 10,
    });

    const response = await request(app)
      .post('/orders')
      .send({
        user_id: user._id,
        deliveryman: deliveryman._id,
        user_address_id: user.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      })
      .set('Authorization', `Bearer ${use2.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.user.name).toEqual(use2.name);
    expect(response.body).toHaveProperty('total');
  });

  it('should update a deliveryman hasDelivery when create a order', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        user_id: user._id,
        deliveryman: deliveryman._id,
        user_address_id: user.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const deliverymanUpdated = await Deliveryman.findOne({ _id: deliveryman });

    expect(response.status).toBe(200);
    expect(deliverymanUpdated).toEqual(
      expect.objectContaining({
        hasDelivery: true,
      }),
    );
  });

  it('should not create an order with invalid source', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    await factory.create<DistrictInterface>('District');
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        user_id: user._id,
        deliveryman: deliveryman._id,
        user_address_id: user.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'nada',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not create an order with invalid user_address_id', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        user_id: user._id,
        deliveryman: deliveryman._id,
        user_address_id: '5f05febbd43fb02cb0b83d64',
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not create an order with invalid user', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        user_id: '5f05febbd43fb02cb0b83d64',
        deliveryman: deliveryman._id,
        user_address_id: user.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not create an order with invalid deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        user_id: user._id,
        deliveryman: '5f05febbd43fb02cb0b83d64',
        user_address_id: user.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should update a order', async () => {
    const order = await factory.create<OrderInterface>('Order');
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
      price: 10,
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        identification: '1234567',
        user_id: order.user.user_id,
        deliveryman: order.deliveryman,
        user_address_id: order.address.user_address_id,
        note: 'Brabo',
        source: 'Whatsapp',
        items: [
          {
            product: product._id,
            quantity: 12,
          },
        ],
        viewed: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // console.log(response.body);
    expect(response.body).toHaveProperty('total');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        source: 'Whatsapp',
        identification: '1234567',
        note: 'Brabo',
        viewed: true,
      }),
    );
  });

  it('should update a order total with address change', async () => {
    await factory.create<DistrictInterface>('District');
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const order = await factory.create<OrderInterface>('Order', {
      user: {
        user_id: user._id,
        name: 'Marcos',
        phone: ['1324'],
      },
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        user_address_id: user.address[0]._id,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const isEqual = order.total === response.body.total ? true : false;
    expect(response.body).toHaveProperty('total');
    expect(response.status).toBe(200);
    expect(isEqual).toBe(false);
  });

  it('should finish a order', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    const order = await factory.create<OrderInterface>('Order', {
      deliveryman: deliveryman._id,
    });
    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        finished: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        finished: true,
      }),
    );
  });

  it('should update a order and update a deliveryman available', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const delivaryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        available: false,
      },
    );
    const order = await factory.create<OrderInterface>('Order', {
      deliveryman: delivaryman._id,
    });

    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        identification: '1234567',
        user_id: order.user.user_id,
        deliveryman: order.deliveryman,
        user_address_id: order.address.user_address_id,
        note: 'Brabo',
        payment: 'Dinheiro',
        source: 'Whatsapp',
        items: [
          {
            product: product._id,
            quantity: 12,
          },
        ],
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const deliverymanUpdated = await Deliveryman.findOne({
      _id: delivaryman._id,
    });
    expect(response.status).toBe(200);
    expect(deliverymanUpdated?.available).toBe(false);
  });

  it('should update a order user and address', async () => {
    const user = await factory.create<IUserDocument>('User', {
      name: 'Cleiton',
      admin: true,
    });

    const order = await factory.create<OrderInterface>('Order');
    await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        identification: '1234567',
        user_id: user._id,
        deliveryman: order.deliveryman,
        user_address_id: user.address[0]._id,
        note: 'Brabo',
        source: 'Whatsapp',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        source: 'Whatsapp',
        identification: '1234567',
        note: 'Brabo',
        user: expect.objectContaining({
          name: 'Cleiton',
        }),
      }),
    );
  });

  it('should not update a order user invalid', async () => {
    const user = await factory.create<IUserDocument>('User', {
      name: 'Cleiton',
      admin: true,
    });

    const order = await factory.create<OrderInterface>('Order');
    await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        identification: '1234567',
        user_id: '5f05febbd43fb02cb0b83d64',
        deliveryman: order.deliveryman,
        user_address_id: user.address[0]._id,
        note: 'Brabo',
        total: 100,
        source: 'Whatsapp',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });

  it('should not update a order address invalid', async () => {
    const user = await factory.create<IUserDocument>('User', {
      name: 'Cleiton',
      admin: true,
    });

    const order = await factory.create<OrderInterface>('Order');
    await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        identification: '1234567',
        deliveryman: order.deliveryman,
        user_address_id: '5f05febbd43fb02cb0b83d64',
        note: 'Brabo',
        total: 100,
        source: 'Whatsapp',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not update a inexistent order', async () => {
    const order = await factory.create<OrderInterface>('Order');
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app)
      .put(`/orders/5f08ae43157a8a40bae90fd7`)
      .send({
        identification: '1234567',
        user_id: order.user.user_id,
        deliveryman: order.deliveryman,
        user_address_id: order.address.user_address_id,
        note: 'Brabo',
        total: 100,
        source: 'Whatsapp',
        finished: true,
        items: [
          {
            product: product._id,
            quantity: 12,
          },
        ],
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // console.log(response.body);
    expect(response.status).toBe(400);
  });

  it('should delete an order', async () => {
    const order = await factory.create<OrderInterface>('Order');
    const user = await factory.create<IUserDocument>('User', { admin: true });

    const response = await request(app)
      .delete(`/orders/${order._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should list all orders', async () => {
    await factory.createMany<OrderInterface>('Order', 3, {
      finished: false,
    });
    const user = await factory.create<IUserDocument>('User', { admin: true });

    const response = await request(app)
      .get(`/orders`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);

    // expect(response.body.length).toBe(3);
  });

  it('should list a order by identification', async () => {
    await factory.createMany<OrderInterface>('Order', 3, { finished: false });
    const order = await factory.create<OrderInterface>('Order', {
      identification: '1234543',
      finished: false,
    });
    const user = await factory.create<IUserDocument>('User', { admin: true });

    const response = await request(app)
      .get(`/orders/${order.identification}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        identification: '1234543',
      }),
    );
  });

  it('should list a order by deliveryman identification', async () => {
    await factory.createMany<OrderInterface>('Order', 3, { finished: false });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    await factory.create<OrderInterface>('Order', {
      deliveryman: deliveryman._id,
      identification: '123123',
      finished: false,
    });
    const user = await factory.create<IUserDocument>('User', { admin: true });

    const response = await request(app)
      .get(`/orders/deliveryman/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    // console.log(response.body);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          identification: '123123',
        }),
      ]),
    );
  });

  it('should list a order by user id', async () => {
    const user = await factory.create<IUserDocument>('User');
    await factory.createMany<OrderInterface>('Order', 3, { finished: false });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
    );
    await factory.create<OrderInterface>('Order', {
      deliveryman: deliveryman._id,
      user: { user_id: user._id, name: user.name },
      identification: '123123',
      finished: false,
    });

    const response = await request(app)
      .get(`/orders/user/`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          identification: '123123',
        }),
      ]),
    );
  });
});
