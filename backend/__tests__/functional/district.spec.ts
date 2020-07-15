import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import District from '../../src/app/models/District';
import app from '../../src/app';
import factory from '../factories';

import { DistrictInterface } from '../../src/interfaces/base';
import { name } from 'faker';

describe('should test', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await District.deleteMany({});
  });

  it('should create a district', async () => {
    const response = await request(app).post('/districts').send({
      name: 'Lumiar',
      city: 'Nova Friburgo',
      rate: 10,
    });

    expect(response.status).toBe(200);
  });

  it('should update a district', async () => {
    const district = await factory.create<DistrictInterface>('District');

    const response = await request(app).put(`/districts/${district._id}`).send({
      name: 'Lumiar',
      city: district.city,
      rate: 10,
    });

    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Lumiar',
        rate: 10,
      })
    );
  });

  it('should delete a district', async () => {
    const district = await factory.create<DistrictInterface>('District');

    const response = await request(app).delete(`/districts/${district._id}`);

    const countDocuments = await District.find({}).countDocuments();

    expect(response.status).toBe(200);
    // expect(countDocuments).toBe(0);
  });

  it('should list all districts', async () => {
    const district = await factory.create<DistrictInterface>('District', {
      name: 'Lumiar',
    });
    const district2 = await factory.create<DistrictInterface>('District', {
      name: 'São Pedro',
    });

    const response = await request(app).get('/districts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Lumiar',
        }),
        expect.objectContaining({
          name: 'São Pedro',
        }),
      ])
    );
  });

  it('should list all districts by name', async () => {
    const district = await factory.create<DistrictInterface>('District', {
      name: 'São Thiagua',
    });
    const district2 = await factory.create<DistrictInterface>('District', {
      name: 'São Pedro',
    });

    const response = await request(app).get(`/districts/s`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'São Thiagua',
        }),
        expect.objectContaining({
          name: 'São Pedro',
        }),
      ])
    );
  });
});
