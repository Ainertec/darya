import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import path from 'path';
import fs from 'fs';
import Order from '../../src/app/models/Order';
import app from '../../src/app';
import factory from '../factories';

import { OrderInterface, UserInterface } from '../../src/interfaces/base';

describe('Teste a printer', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
  });

  it('Should print a recipe without address', async () => {
    const order = await factory.create<OrderInterface>('Order', {
      address: undefined,
    });

    const response = await request(app).post('/printers').send({
      id: order.id,
    });
    expect(response.status).toBe(200);
    setTimeout(async () => {
      await fs.unlinkSync(
        path.resolve(__dirname, '..', 'recipes', `${order._id}.rtf`),
      );
    }, 1000);
  });

  it('Should print a recipe without a user phone', async () => {
    const user = await factory.create<UserInterface>('User');
    const order = await factory.create<OrderInterface>('Order', {
      address: undefined,
      deliveryman: undefined,
      user: {
        name: 'cleiton',
        user_id: user._id,
        phone: undefined,
      },
    });

    const response = await request(app).post('/printers').send({
      id: order.id,
    });
    expect(response.status).toBe(200);
    setTimeout(async () => {
      await fs.unlinkSync(
        path.resolve(__dirname, '..', 'recipes', `${order._id}.rtf`),
      );
    }, 1000);
  });

  it('Should print a recipe without deliveryman', async () => {
    const order = await factory.create<OrderInterface>('Order', {
      address: undefined,
      deliveryman: undefined,
    });

    const response = await request(app).post('/printers').send({
      id: order.id,
    });
    expect(response.status).toBe(200);
    setTimeout(async () => {
      await fs.unlinkSync(
        path.resolve(__dirname, '..', 'recipes', `${order._id}.rtf`),
      );
    }, 1000);
  });

  it('Should print a recipe', async () => {
    const order = await factory.create<OrderInterface>('Order');

    const response = await request(app).post('/printers').send({
      id: order.id,
    });
    expect(response.status).toBe(200);
    setTimeout(async () => {
      await fs.unlinkSync(
        path.resolve(__dirname, '..', 'recipes', `${order._id}.rtf`),
      );
    }, 1000);
  });

  it('Should not print a recipe with invalid order', async () => {
    const order = await factory.create<OrderInterface>('Order');

    const response = await request(app).post('/printers').send({
      id: '5f05febbd43fb02cb0b83d64',
    });
    expect(response.status).toBe(400);
  });
});
