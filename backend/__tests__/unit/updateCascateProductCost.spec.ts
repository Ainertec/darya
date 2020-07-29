import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/app/models/Ingredient';
import Product from '../../src/app/models/Product';
import app from '../../src/app';
import factory from '../factories';

import { IngredientInterface, ProductInterface } from '../../src/interfaces/base';

describe('should test a update cascate when update a ingredient price', () => {
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
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const product = await factory.create<ProductInterface>('Product', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const response = await request(app).put(`/ingredients/${ingredient._id}`).send({
      name: ingredient.name,
      price: 2,
      stock: 20,
      description: ingredient.description,
      unit: 'g',
    });
    const productUpdated = await Product.findOne({ _id: product._id });
    // console.log(product);
    // console.log(productUpdated);
    expect(response.status).toBe(200);
    expect(productUpdated?.cost).toBe(20);
  });
});