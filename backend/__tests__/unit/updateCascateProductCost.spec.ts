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

describe('should test a update cascade when update a ingredient price', () => {
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

  it('should update a product cost when update a ingredint price', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const response = await request(app)
      .put(`/ingredients/${ingredient._id}`)
      .send({
        name: ingredient.name,
        price: 2,
        stock: 20,
        description: ingredient.description,
        unit: 'g',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const productUpdated = await Product.findOne({ _id: product._id });
    // console.log(response.body);
    // console.log(productUpdated);
    expect(response.status).toBe(200);
    expect(productUpdated?.cost).toBe(20);
  });

  it('should update all products cost when update a ingredint price', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const product2 = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const response = await request(app)
      .put(`/ingredients/${ingredient._id}`)
      .send({
        name: ingredient.name,
        price: 2,
        stock: 20,
        description: ingredient.description,
        unit: 'g',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const productUpdated = await Product.findOne({ _id: product._id });
    const productUpdated2 = await Product.findOne({ _id: product2._id });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(productUpdated?.cost).toBe(20);
    expect(productUpdated2?.cost).toBe(20);
  });
});
