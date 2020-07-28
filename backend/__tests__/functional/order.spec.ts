import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Client from '../../src/app/models/Client';
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
    await Client.deleteMany({});
    await Deliveryman.deleteMany({});
    await Order.deleteMany({});
  });

  it('should create an order', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product', { price: 10 });

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
    // console.log('teste', response.body);
    expect(response.body).toHaveProperty('total');
    expect(response.status).toBe(200);
  });

  it('should create an order without a address', async () => {
    const client = await factory.create<ClientInterface>('Client');
    // const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product', { price: 10 });

    const response = await request(app)
      .post('/orders')
      .send({
        client_id: client._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      });
    // console.log(response.body);
    expect(response.body).toHaveProperty('total');
    expect(response.status).toBe(200);
  });

  it('should create an order without a deliveryman', async () => {
    const client = await factory.create<ClientInterface>('Client');
    // const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product', { price: 10 });

    const response = await request(app)
      .post('/orders')
      .send({
        client_id: client._id,
        // deliveryman: deliveryman._id,
        client_address_id: client.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      });
    // console.log(response.body);
    expect(response.body).toHaveProperty('total');
    expect(response.body).toEqual(
      expect.objectContaining({
        deliveryman: null,
      })
    );
    expect(response.status).toBe(200);
  });

  it('should update a deliveryman hasDelivery when create a order', async () => {
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
    const deliverymanUpdated = await Deliveryman.findOne({ _id: deliveryman });

    expect(response.status).toBe(200);
    expect(deliverymanUpdated).toEqual(
      expect.objectContaining({
        hasDelivery: true,
      })
    );
  });

  it('should not create an order with invalid source', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const district = await factory.create<DistrictInterface>('District');
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
        source: 'nada',
      });

    expect(response.status).toBe(400);
  });

  it('should not create an order with invalid client_address_id', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        client_id: client._id,
        deliveryman: deliveryman._id,
        client_address_id: '5f05febbd43fb02cb0b83d64',
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      });

    expect(response.status).toBe(400);
  });

  it('should not create an order with invalid client', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        client_id: '5f05febbd43fb02cb0b83d64',
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

    expect(response.status).toBe(400);
  });

  it('should not create an order with invalid deliveryman', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        client_id: client._id,
        deliveryman: '5f05febbd43fb02cb0b83d64',
        client_address_id: client.address[0]._id,
        items: [
          {
            product: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      });

    expect(response.status).toBe(400);
  });

  it('should update a order', async () => {
    const order = await factory.create<OrderInterface>('Order');
    // const client = await factory.create<ClientInterface>('Client');
    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
      price: 10,
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        identification: '1234567',
        client_id: order.client.client_id,
        deliveryman: order.deliveryman,
        client_address_id: order.address?.client_address_id,
        note: 'Brabo',
        source: 'Whatsapp',
        items: [
          {
            product: product._id,
            quantity: 12,
          },
        ],
      });
    // console.log(response.body);
    expect(response.body).toHaveProperty('total');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        source: 'Whatsapp',
        identification: '1234567',
        note: 'Brabo',
      })
    );
  });

  it('should update a order total with address change', async () => {
    const district = await factory.create<DistrictInterface>('District');
    const client = await factory.create<ClientInterface>('Client');
    const order = await factory.create<OrderInterface>('Order', {
      client: {
        client_id: client._id,
        name: 'asdf',
        phone: ['1324'],
      },
    });

    const response = await request(app).put(`/orders/${order._id}`).send({
      client_address_id: client.address[0]._id,
    });
    const isEqual = order.total === response.body.total ? true : false;
    expect(response.body).toHaveProperty('total');
    expect(response.status).toBe(200);
    expect(isEqual).toBe(false);
  });

  it('should finish a order', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const order = await factory.create<OrderInterface>('Order', { deliveryman: deliveryman._id });
    const response = await request(app).put(`/orders/${order._id}`).send({
      finished: true,
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        finished: true,
      })
    );
  });

  it('should finish a order with a invalid deliveryman', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const order = await factory.create<OrderInterface>('Order', { deliveryman: deliveryman._id });
    const response = await request(app).put(`/orders/${order._id}`).send({
      finished: true,
      deliveryman: '5f05febbd43fb02cb0b83d64',
    });
    expect(response.status).toBe(400);
  });

  it('should update a order and update a deliveryman available', async () => {
    const delivaryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      available: false,
    });
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
        client_id: order.client.client_id,
        deliveryman: order.deliveryman,
        client_address_id: order.address?.client_address_id,
        note: 'Brabo',
        payment: 'Dinheiro',
        source: 'Whatsapp',
        items: [
          {
            product: product._id,
            quantity: 12,
          },
        ],
      });
    const deliverymanUpdated = await Deliveryman.findOne({ _id: delivaryman._id });
    expect(response.status).toBe(200);
    expect(deliverymanUpdated?.available).toBe(false);
  });

  it('should update a order client and address', async () => {
    const client = await factory.create<ClientInterface>('Client', { name: 'Cleiton' });

    const order = await factory.create<OrderInterface>('Order');
    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app).put(`/orders/${order._id}`).send({
      identification: '1234567',
      client_id: client._id,
      deliveryman: order.deliveryman,
      client_address_id: client.address[0]._id,
      note: 'Brabo',
      source: 'Whatsapp',
    });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        source: 'Whatsapp',
        identification: '1234567',
        note: 'Brabo',
        client: expect.objectContaining({
          name: 'Cleiton',
        }),
      })
    );
  });

  it('should not update a order client invalid', async () => {
    const client = await factory.create<ClientInterface>('Client', { name: 'Cleiton' });

    const order = await factory.create<OrderInterface>('Order');
    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app).put(`/orders/${order._id}`).send({
      identification: '1234567',
      client_id: '5f05febbd43fb02cb0b83d64',
      deliveryman: order.deliveryman,
      client_address_id: client.address[0]._id,
      note: 'Brabo',
      total: 100,
      source: 'Whatsapp',
    });
    expect(response.status).toBe(400);
  });

  it('should not update a order address invalid', async () => {
    const client = await factory.create<ClientInterface>('Client', { name: 'Cleiton' });

    const order = await factory.create<OrderInterface>('Order');
    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app).put(`/orders/${order._id}`).send({
      identification: '1234567',
      deliveryman: order.deliveryman,
      client_address_id: '5f05febbd43fb02cb0b83d64',
      note: 'Brabo',
      total: 100,
      source: 'Whatsapp',
    });

    expect(response.status).toBe(400);
  });

  it('should not update a inexistent order', async () => {
    const order = await factory.create<OrderInterface>('Order');
    // const client = await factory.create<ClientInterface>('Client');
    const product = await factory.create<ProductInterface>('Product', {
      name: 'Chocolate',
    });

    const response = await request(app)
      .put(`/orders/5f08ae43157a8a40bae90fd7`)
      .send({
        identification: '1234567',
        client_id: order.client.client_id,
        deliveryman: order.deliveryman,
        client_address_id: order.address?.client_address_id,
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
      });
    // console.log(response.body);
    expect(response.status).toBe(400);
  });

  it('should delete an order', async () => {
    const order = await factory.create<OrderInterface>('Order');

    const response = await request(app).delete(`/orders/${order._id}`);

    expect(response.status).toBe(200);
  });

  it('should list all orders', async () => {
    const order = await factory.createMany<OrderInterface>('Order', 3, { finished: false });

    const response = await request(app).get(`/orders`);

    expect(response.status).toBe(200);

    // expect(response.body.length).toBe(3);
  });

  it('should list a order by identification', async () => {
    await factory.createMany<OrderInterface>('Order', 3, { finished: false });
    const order = await factory.create<OrderInterface>('Order', {
      identification: '1234543',
      finished: false,
    });

    const response = await request(app).get(`/orders/${order.identification}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        identification: '1234543',
      })
    );
  });

  it('should list a order by deliveryman identification', async () => {
    await factory.createMany<OrderInterface>('Order', 3, { finished: false });
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    await factory.create<OrderInterface>('Order', {
      deliveryman: deliveryman._id,
      identification: '123123',
      finished: false,
    });

    const response = await request(app).get(`/orders/deliveryman/${deliveryman._id}`);

    expect(response.status).toBe(200);
    // console.log(response.body);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          identification: '123123',
        }),
      ])
    );
  });
});
