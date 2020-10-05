/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/app/models/Ingredient';
import Product from '../../src/app/models/Product';
import app from '../../src/app';
import factory from '../factories';
import { subIngredientStock } from '../../src/app/utils/subIngredientStock';

import {
  IngredientInterface,
  ProductInterface,
  OrderInterface,
} from '../../src/interfaces/base';
import { IUserDocument } from '../../src/app/models/User';

describe('should sub ingredient stock when a order is finished', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Ingredient.deleteMany({});
    await Product.deleteMany({});
  });

  it('should sub a ingredient stock when a order is finished', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      stock: 2000,
    });
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: product._id,
          quantity: 2,
        },
      ],
      finished: false,
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        finished: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const ingredientUpdated = await Ingredient.findOne({ _id: ingredient._id });
    // console.log(ingredientUpdated);
    expect(response.status).toBe(200);
    expect(ingredientUpdated?.stock).toBe(1600);
  });

  it('should sub all product  ingredients stock when a order is finished', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      stock: 2000,
    });
    const ingredient2 = await factory.create<IngredientInterface>(
      'Ingredient',
      {
        stock: 2200,
      },
    );
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });
    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: product._id,
          quantity: 2,
        },
      ],
      finished: false,
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        finished: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const ingredientUpdated = await Ingredient.findOne({ _id: ingredient._id });
    const ingredientUpdated2 = await Ingredient.findOne({
      _id: ingredient2._id,
    });
    // console.log(ingredientUpdated);
    expect(response.status).toBe(200);
    expect(ingredientUpdated?.stock).toBe(1600);
    expect(ingredientUpdated2?.stock).toBe(1800);
  });

  it('should update an ingredient stock with subIngredientStock function', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      stock: 2000,
      name: 'farinha',
    });
    const ingredient2 = await factory.create<IngredientInterface>(
      'Ingredient',
      {
        stock: 2000,
        name: 'Chocolate',
      },
    );
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });
    const product2 = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 400,
        },
        {
          material: ingredient2._id,
          quantity: 100,
        },
      ],
    });

    const orderArray = [product, product2];

    for (const item of orderArray) {
      await subIngredientStock(item.ingredients, 2);
    }

    const ingredientUpdated = await Ingredient.findOne({ _id: ingredient._id });
    const ingredientUpdated2 = await Ingredient.findOne({
      _id: ingredient2._id,
    });
    expect(ingredientUpdated?.stock).toBe(800);
    expect(ingredientUpdated2?.stock).toBe(1400);
  });

  it('should sub all product ingredients stock when a order is finished(same ingredients)', async () => {
    const user = await factory.create<IUserDocument>('User', { admin: true });
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      stock: 2000,
      name: 'farinha',
    });
    const ingredient2 = await factory.create<IngredientInterface>(
      'Ingredient',
      {
        stock: 2000,
        name: 'Chocolate',
      },
    );
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });
    const product2 = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 400,
        },
        {
          material: ingredient2._id,
          quantity: 100,
        },
      ],
    });
    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: product._id,
          quantity: 2,
        },
        {
          product: product2._id,
          quantity: 3,
        },
      ],
      finished: false,
    });

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        finished: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const ingredientUpdated = await Ingredient.findOne({ _id: ingredient._id });
    const ingredientUpdated2 = await Ingredient.findOne({
      _id: ingredient2._id,
    });
    // console.log(ingredientUpdated);
    expect(response.status).toBe(200);
    expect(ingredientUpdated?.stock).toBe(400);
    expect(ingredientUpdated2?.stock).toBe(1300);
  });
});
