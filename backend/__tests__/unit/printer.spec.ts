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
import { response } from 'express';

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

  it('Should print a recipe', async () => {
    const order = await factory.create<OrderInterface>('Order');

    const response = await request(app).post('/printers').send({
      id: order.id,
    });

    expect(response.status).toBe(200);
  });
});
