import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/app/models/Ingredient';
import Product from '../../src/app/models/Product';
import app from '../../src/app';
import factory from '../factories';

import { IngredientInterface, ProductInterface, OrderInterface } from '../../src/interfaces/base';

describe('should sub ingredinet stock when a order is finished', () => {
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

    const response = await request(app).put(`/orders/${order._id}`).send({
      finished: true,
    });
    const ingredientUpdated = await Ingredient.findOne({ _id: ingredient._id });
    console.log(ingredientUpdated);
    expect(response.status).toBe(200);
    expect(ingredientUpdated?.stock).toBe(1600);
  });
});
