import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Product from '../../src/app/models/Product';
import app from '../../src/app';
import factory from '../factories';

import { ProductInterface } from '../../src/interfaces/base';

describe('should test', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Product.deleteMany({});
  });

  it('should create a product', async () => {
    const response = await request(app).post('/products').send({
      name: 'roquinha',
      price: 4.5,
      cost: 3.0,
      description: 'como que é o nome daquele negocio?',
    });

    expect(response.status).toBe(200);
  });

  it('should update a product', async () => {
    const product = await factory.create<ProductInterface>('Product');

    const response = await request(app).put(`/products/${product._id}`).send({
      name: 'roquinha',
      price: product.price,
      cost: product.cost,
      description: product.description,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'roquinha',
      })
    );
  });

  it('should delete a product', async () => {
    const product = await factory.create<ProductInterface>('Product');

    const response = await request(app).delete(`/products/${product._id}`);

    const countDocuments = await Product.find({}).countDocuments();

    expect(response.status).toBe(200);
    expect(countDocuments).toBe(0);
  });

  it('should list products by name', async () => {
    await factory.create<ProductInterface>('Product', {
      name: 'pizza',
    });
    await factory.create<ProductInterface>('Product', {
      name: 'pão',
    });
    await factory.create<ProductInterface>('Product', {
      name: 'queijo',
    });

    const response = await request(app).get(`/products/p`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'pizza',
        }),
        expect.objectContaining({
          name: 'pão',
        }),
      ])
    );
  });

  it('should list all products ', async () => {
    await factory.create<ProductInterface>('Product', {
      name: 'pizza',
    });
    await factory.create<ProductInterface>('Product', {
      name: 'pão',
    });
    await factory.create<ProductInterface>('Product', {
      name: 'queijo',
    });

    const response = await request(app).get(`/products`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'pizza',
        }),
        expect.objectContaining({
          name: 'pão',
        }),
        expect.objectContaining({
          name: 'queijo',
        }),
      ])
    );
  });
});
