import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Deliveryman from '../../src/app/models/Deliveryman';
import app from '../../src/app';
import factory from '../factories';

import { DeliverymanInterface } from '../../src/interfaces/base';

describe('should test', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Deliveryman.deleteMany({});
  });

  it('should create a deliveryman', async () => {
    const response = await request(app).post('/deliverymans').send({
      name: 'Jão',
      working_day: false,
      phone: '99726852',
    });
    expect(response.status).toBe(200);
  });

  it('should update a deliveryman', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      working_day: true,
      avaliable: true,
    });

    const response = await request(app).put(`/deliverymans/${deliveryman._id}`).send({
      name: 'Paulo',
      phone: deliveryman.phone,
      working_day: true,
      avaliable: false,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Paulo',
      })
    );
  });

  it('should update an avaliable field of a deliveryman', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      working_day: false,
      avaliable: false,
    });

    const response = await request(app).put(`/deliverymans/${deliveryman._id}`).send({
      avaliable: true,
      phone: deliveryman.phone,
      name: 'Paulo',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Paulo',
        avaliable: true,
        working_day: false,
      })
    );
  });

  it('should update a working_day field of a deliveryman', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      working_day: false,
      avaliable: false,
    });

    const response = await request(app).put(`/deliverymans/${deliveryman._id}`).send({
      working_day: true,
      phone: deliveryman.phone,
      name: 'Paulo',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Paulo',
        avaliable: false,
        working_day: true,
      })
    );
  });

  it('should not update a field of an unexisten deliveryman', async () => {
    const response = await request(app).put(`/deliverymans/5f05febbd43fb02cb0b83d64`).send({
      working_day: true,
      name: 'Paulo',
    });
    expect(response.status).toBe(400);
  });

  it('should delete a deliveryman', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      working_day: true,
      avaliable: true,
    });

    const response = await request(app).delete(`/deliverymans/${deliveryman._id}`);

    const countDocuments = await Deliveryman.find({}).countDocuments();

    expect(response.status).toBe(200);
    expect(countDocuments).toBe(0);
  });

  it('should list a deliveryman by id', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      working_day: true,
      avaliable: true,
    });
    const deliveryman2 = await factory.create<DeliverymanInterface>('Deliveryman', {
      name: 'carlos',
      working_day: true,
      avaliable: true,
    });

    const response = await request(app).get(`/deliverymans/${deliveryman2._id}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'carlos',
      })
    );
  });

  it('should list all deliveryman ', async () => {
    const deliveryman = await factory.create<DeliverymanInterface>('Deliveryman', {
      name: 'jãozin',
      working_day: true,
      avaliable: true,
    });
    const deliveryman2 = await factory.create<DeliverymanInterface>('Deliveryman', {
      name: 'carlos',
      working_day: true,
      avaliable: true,
    });

    const response = await request(app).get(`/deliverymans`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'carlos',
        }),
        expect.objectContaining({
          name: 'jãozin',
        }),
      ])
    );
  });
});
