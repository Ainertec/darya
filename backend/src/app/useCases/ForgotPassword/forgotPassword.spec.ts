/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import {
  closeConnection,
  openConnection,
} from '../../../../__tests__/utils/connection';
import User, { IUser, IUserDocument } from '../../models/User';
import app from '../../../app';
import factory from '../../../../__tests__/factories';

describe('Reset password', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should be able to get user question', async () => {
    const user = await factory.create<IUser>('User', {
      username: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
    });

    const response = await request(app).get(`/forgot/${user.username}`);
    expect(response.body).toEqual(
      expect.objectContaining({
        question: user.question,
      }),
    );
  });

  it('should not get user question with invalid user', async () => {
    const response = await request(app).get(`/forgot/geovane`);

    expect(response.status).toBe(400);
  });

  it('should rest password', async () => {
    const user = await factory.create<IUser>('User', {
      username: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
      password: '1234',
    });

    const response = await request(app).post('/forgot').send({
      username: user.username,
      response: 'cledir',
      password: '92865120',
    });

    expect(response.status).toBe(200);
    const userReseted = await User.findOne({ username: user.username });
    if (userReseted) {
      const validPassword = await userReseted.checkPassword('92865120');
      expect(validPassword).toBe(true);
    }
  });

  it('should not reset password with incorrect user name', async () => {
    await factory.create('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
    });
    const response = await request(app).post('/forgot').send({
      name: 'Json',
      response: 'Maria Clara',
      password: '92865120',
    });

    expect(response.status).toBe(400);
  });

  it('should not reset password with incorrect response for user question', async () => {
    const user = await factory.create('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
    });
    const response = await request(app).post('/forgot').send({
      name: user.name,
      response: 'Maria Clara',
      password: '92865120',
    });

    expect(response.status).toBe(400);
  });
});
