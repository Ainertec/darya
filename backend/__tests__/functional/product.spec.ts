import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Product from '../../src/app/models/Product';
import app from '../../src/app';
import factory from '../factories';

import { ProductInterface, IngredientInterface } from '../../src/interfaces/base';

describe('should test a product', () => {
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
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      price: 5,
      stock: 2000,
      priceUnit: 5 / 2000,
    });
    const response = await request(app)
      .post('/products')
      .send({
        name: 'roquinha',
        price: 4.5,
        ingredients: [
          {
            material: ingredient._id,
            quantity: 500,
          },
        ],
        description: 'como que é o nome daquele negocio?',
      });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        cost: 1.25,
      })
    );
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
