/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { closeConnection, openConnection } from '../../utils/connection';
import { IDistrict } from '../../Entity/Client';
import app from '../../app';
import factory from '../../utils/factories';
import { District } from '../../Entity/District';

describe('District list', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await District.deleteMany({});
  });
  it('Should list all districts', async () => {
    const district = await factory.createMany<IDistrict>('District', 3);

    const response = await request(app).get('/districts');

    expect(response.body.length).toBe(3);
    expect(response.status).toBe(200);
  });
  it('Should list all districts by name', async () => {
    await factory.createMany<IDistrict>('District', 3);
    await factory.create<IDistrict>('District', {
      name: 'Lumiar',
    });

    const response = await request(app).get('/districts/lum');

    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
  });
});
