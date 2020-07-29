import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/app/models/Ingredient';
import app from '../../src/app';
import factory from '../factories';

import { IngredientInterface } from '../../src/interfaces/base';

describe('should test a ingredient', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Ingredient.deleteMany({});
  });

  it('should create a ingredient', async () => {
    const response = await request(app).post('/ingredients').send({
      name: 'chocolate',
      price: 2.0,
      stock: 20,
      unit: 'g',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        priceUnit: 0.1,
      })
    );
  });

  it('should not create a ingredient with a invalid unit', async () => {
    const response = await request(app).post('/ingredients').send({
      name: 'chocolate',
      price: 2.0,
      stock: 20,
      unit: 'lkl',
    });

    expect(response.status).toBe(400);
  });

  it('should update  a ingredient', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const response = await request(app).put(`/ingredients/${ingredient._id}`).send({
      name: 'chocolate',
      price: 2.0,
      stock: 20,
      unit: 'g',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        priceUnit: 0.1,
      })
    );
  });

  it('should not update a ingredient with invalid unit', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const response = await request(app).put(`/ingredients/${ingredient._id}`).send({
      name: 'chocolate',
      price: 2.0,
      stock: 20,
      unit: 'as',
    });

    expect(response.status).toBe(400);
  });

  it('should delete a ingredient', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const response = await request(app).delete(`/ingredients/${ingredient._id}`);

    expect(response.status).toBe(200);
  });

  it('should list all ingredients', async () => {
    await factory.createMany<IngredientInterface>('Ingredient', 4);

    const response = await request(app).get('/ingredients');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
  });

  it('should list all ingredients by name', async () => {
    await factory.create<IngredientInterface>('Ingredient', { name: 'Farinha' });
    await factory.create<IngredientInterface>('Ingredient', { name: 'Chocolate' });

    const response = await request(app).get(`/ingredients/far`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Farinha',
        }),
      ])
    );
  });
});
