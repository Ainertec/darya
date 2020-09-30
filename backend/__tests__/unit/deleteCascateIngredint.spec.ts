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
import { IUserDocument } from '../../src/app/models/User';

describe('should test a delete cascade when delete a ingredient', () => {
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
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });

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

    const response = await request(app)
      .delete(`/ingredients/${ingredient._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const productUpdated = await Product.findOne({ _id: product._id });

    expect(productUpdated?.ingredients.length).toBe(1);
    expect(response.status).toBe(200);
  });

  it('should delete a unic product ingredient when a ingredient is deleted', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });

    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 300,
        },
      ],
    });

    const response = await request(app)
      .delete(`/ingredients/${ingredient._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const productUpdated = await Product.findOne({ _id: product._id });

    expect(productUpdated?.ingredients.length).toBe(0);
    expect(response.status).toBe(200);
  });

  it('should not delete a product ingredient when a ingredient is deleted, if it does not use it', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });

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

    const response = await request(app)
      .delete(`/ingredients/${ingredient3._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const productUpdated = await Product.findOne({ _id: product._id });
    expect(productUpdated?.ingredients.length).toBe(2);
    expect(response.status).toBe(200);
  });
});
