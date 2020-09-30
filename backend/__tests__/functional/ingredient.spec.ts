import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/app/models/Ingredient';
import app from '../../src/app';
import factory from '../factories';

import { IngredientInterface } from '../../src/interfaces/base';
import { IUserDocument } from '../../src/app/models/User';

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
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const response = await request(app)
      .post('/ingredients')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'chocolate',
        price: 2.0,
        stock: 20,
        unit: 'g',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        priceUnit: 0.1,
      }),
    );
  });

  it('should not create a ingredient with a invalid unit', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const response = await request(app)
      .post('/ingredients')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'chocolate',
        price: 2.0,
        stock: 20,
        unit: 'lkl',
      });

    expect(response.status).toBe(400);
  });

  it('should update  a ingredient', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const response = await request(app)
      .put(`/ingredients/${ingredient._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'chocolate',
        price: 2.0,
        stock: 20,
        unit: 'g',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        priceUnit: 0.1,
      }),
    );
  });

  it('should not update a ingredient with invalid unit', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const response = await request(app)
      .put(`/ingredients/${ingredient._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'chocolate',
        price: 2.0,
        stock: 20,
        unit: 'as',
      });

    expect(response.status).toBe(400);
  });

  it('should delete a ingredient', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const response = await request(app)
      .delete(`/ingredients/${ingredient._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should list all ingredients', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    await factory.createMany<IngredientInterface>('Ingredient', 4);

    const response = await request(app)
      .get('/ingredients')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
  });

  it('should list all ingredients by name', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    await factory.create<IngredientInterface>('Ingredient', {
      name: 'Farinha',
    });
    await factory.create<IngredientInterface>('Ingredient', {
      name: 'Chocolate',
    });

    const response = await request(app)
      .get(`/ingredients/far`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Farinha',
        }),
      ]),
    );
  });
});
