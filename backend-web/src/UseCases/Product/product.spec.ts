/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { closeConnection, openConnection } from '../../utils/connection';

import app from '../../app';
import factory from '../../utils/factories';
import { Product } from '../../Entity/Product';
import { Ingredient } from '../../Entity/Ingredients';
import { IClientDocument } from '../../Entity/Client';

describe('District list', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Product.deleteMany({});
    await Ingredient.deleteMany({});
  });

  it('Should list all products', async () => {
    await factory.createMany('Product', 4);
    const client = await factory.create<IClientDocument>('Client');

    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${client.generateToken()}`);
    expect(response.body.length).toBe(4);
    expect(response.status).toBe(200);
  });
  it('Should list all products by name', async () => {
    await factory.createMany('Product', 4);
    await factory.create('Product', {
      name: 'CHocolate',
    });
    const client = await factory.create<IClientDocument>('Client');

    const response = await request(app)
      .get('/products/cho')
      .set('Authorization', `Bearer ${client.generateToken()}`);
    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
  });
});
