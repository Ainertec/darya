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

  it('should create a order', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman');
    const district = await factory.create<DistrictInterface>('District');
    const products = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .post('/orders')
      .send({
        client: client._id,
        deliveryman: deliveryman._id,
        district: district._id,
        client_address_id: client.address[0]._id,
        items: [
          {
            products: products._id,
            quantity: 5,
          },
        ],
        source: 'Ifood',
      });

    expect(response.status).toBe(200);
  });
});
