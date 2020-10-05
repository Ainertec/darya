import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Product from '../../src/app/models/Product';
import app from '../../src/app';
import factory from '../factories';

import {
  ProductInterface,
  IngredientInterface,
} from '../../src/interfaces/base';
import { IUserDocument } from '../../src/app/models/User';

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
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      price: 5,
      stock: 2000,
      priceUnit: 5 / 2000,
    });
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'roquinha',
        price: 4.5,
        ingredients: [
          {
            material: ingredient._id,
            quantity: 500,
          },
        ],
        available: true,
        description: 'como que é o nome daquele negocio?',
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        cost: 1.25,
      }),
    );
  });

  it('should update a product', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const product = await factory.create<ProductInterface>('Product');
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      price: 5,
      stock: 2000,
      priceUnit: 5 / 2000,
    });

    const response = await request(app)
      .put(`/products/${product._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'roquinha',
        price: product.price,
        ingredients: [
          {
            material: ingredient._id,
            quantity: 500,
          },
        ],
        description: product.description,
      });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'roquinha',
        cost: 1.25,
      }),
    );
  });

  it('should delete a product', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const product = await factory.create<ProductInterface>('Product');

    const response = await request(app)
      .delete(`/products/${product._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const countDocuments = await Product.find({}).countDocuments();

    expect(response.status).toBe(200);
    expect(countDocuments).toBe(0);
  });

  it('should list products by name includes unavailable', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    await factory.create<ProductInterface>('Product', {
      name: 'pizza',
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'pão',
      available: false,
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'queijo',
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });

    const response = await request(app)
      .get(`/products/p`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'pizza',
        }),
        expect.objectContaining({
          name: 'pão',
        }),
      ]),
    );
  });

  it('should list products by name available', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: false,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    await factory.create<ProductInterface>('Product', {
      name: 'pizza',
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'pão',
      available: false,
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'queijo',
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });

    const response = await request(app)
      .get(`/products/p`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'pizza',
        }),
      ]),
    );
  });

  it('should list all products includes unavailable ', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    await factory.create<ProductInterface>('Product', {
      name: 'pizza',
      available: false,
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'pão',
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'queijo',
      available: false,
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const response = await request(app)
      .get(`/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    // console.log(response.body);
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
      ]),
    );
  });

  it('should list all products available', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: false,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    await factory.create<ProductInterface>('Product', {
      name: 'pizza',
      available: false,
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'pão',
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    await factory.create<ProductInterface>('Product', {
      name: 'queijo',
      available: false,
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const response = await request(app)
      .get(`/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'pão',
        }),
      ]),
    );
  });
});
