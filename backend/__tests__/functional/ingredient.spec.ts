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
  });
});
