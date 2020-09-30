/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import {
  closeConnection,
  openConnection,
} from '../../../../__tests__/utils/connection';
import User, { IUser, IUserDocument } from '../../models/User';
import app from '../../../app';
import factory from '../../../../__tests__/factories';

describe('Session Tests', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('it should authenticate a user', async () => {
    await factory.create<IUser>('User', {
      username: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      username: 'Cleiton',
      password: '123456',
    });

    expect(response.status).toBe(200);
  });

  it('it should not authenticate a user with invalid password', async () => {
    await factory.create<IUser>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Cleiton',
      password: '214123',
    });

    expect(response.status).toBe(401);
  });

  it('it should not authenticate a user with invalid name', async () => {
    await factory.create<IUser>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Marcos',
      password: '123456',
    });

    expect(response.status).toBe(401);
  });

  it('it should return a Jwt token when authenticate', async () => {
    await factory.create<IUser>('User', {
      username: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      username: 'Cleiton',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });

  it('it should be able to access private routes', async () => {
    const user = await factory.create<IUserDocument>('User', {
      name: 'Cleiton',
      password: '123456',
      admin: true,
    });
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('it should not be able to access private routes without a jwt token', async () => {
    await factory.create<IUser>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).get('/users');

    expect(response.status).toBe(401);
  });

  it('it should not be able to access private routes with invalid jwt token', async () => {
    await factory.create<IUser>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `askfhi34ax}`);

    expect(response.status).toBe(401);
  });
});
