import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/app/models/Ingredient';
import Product from '../../src/app/models/Product';
import app from '../../src/app';
import factory from '../factories';

import {
  IngredientInterface,
  ProductInterface,
} from '../../src/interfaces/base';

describe('should test a delete cascate when delete a ingredient', () => {
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

  it('should delete a product ingredient when a ingredient is deleted', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const ingredient2 = await factory.create<IngredientInterface>('Ingredient');
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 300,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });

    const response = await request(app).delete(
      `/ingredients/${ingredient._id}`,
    );
    const productUpdated = await Product.findOne({ _id: product._id });

    expect(productUpdated?.ingredients.length).toBe(1);
    expect(response.status).toBe(200);
  });

  it('should delete a unic product ingredient when a ingredient is deleted', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 300,
        },
      ],
    });

    const response = await request(app).delete(
      `/ingredients/${ingredient._id}`,
    );
    const productUpdated = await Product.findOne({ _id: product._id });

    expect(productUpdated?.ingredients.length).toBe(0);
    expect(response.status).toBe(200);
  });

  it('should not delete a product ingredient when a ingredient is deleted, if it does not use it', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const ingredient2 = await factory.create<IngredientInterface>('Ingredient');
    const ingredient3 = await factory.create<IngredientInterface>('Ingredient');
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 300,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });

    const response = await request(app).delete(
      `/ingredients/${ingredient3._id}`,
    );
    const productUpdated = await Product.findOne({ _id: product._id });
    expect(productUpdated?.ingredients.length).toBe(2);
    expect(response.status).toBe(200);
  });
});
