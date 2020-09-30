import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Deliveryman from '../../src/app/models/Deliveryman';
import app from '../../src/app';
import factory from '../factories';

import { DeliverymanInterface } from '../../src/interfaces/base';
import User, { IUserDocument } from '../../src/app/models/User';

describe('should test', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Deliveryman.deleteMany({});
    await User.deleteMany({});
  });

  it('should create a deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const response = await request(app)
      .post('/deliverymans')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Jão',
        working_day: false,
        phone: '99726852',
      });
    expect(response.status).toBe(200);
  });

  it('should update a deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        working_day: true,
        available: true,
      },
    );

    const response = await request(app)
      .put(`/deliverymans/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Paulo',
        phone: deliveryman.phone,
        working_day: true,
        available: false,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Paulo',
      }),
    );
  });

  it('should update an available field of a deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        working_day: false,
        available: false,
      },
    );

    const response = await request(app)
      .put(`/deliverymans/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        available: true,
        phone: deliveryman.phone,
        name: 'Paulo',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Paulo',
        available: true,
        working_day: false,
      }),
    );
  });

  it('should update a working_day field of a deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        working_day: false,
        available: false,
      },
    );

    const response = await request(app)
      .put(`/deliverymans/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        working_day: true,
        phone: deliveryman.phone,
        name: 'Paulo',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Paulo',
        available: false,
        working_day: true,
      }),
    );
  });

  it('should not update a field of an inexistent deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const response = await request(app)
      .put(`/deliverymans/5f05febbd43fb02cb0b83d64`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        working_day: true,
        name: 'Paulo',
      });
    expect(response.status).toBe(400);
  });

  it('should reset an available field and working day of all deliverymans', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'Jão',
        working_day: true,
        available: true,
      },
    );
    const response = await request(app)
      .put(`/deliverymans`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    const delivery = await Deliveryman.findOne({});

    expect(response.status).toBe(200);
    expect(delivery).toEqual(
      expect.objectContaining({
        name: 'Jão',
        working_day: false,
        available: false,
      }),
    );
  });

  it('should delete a deliveryman', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        working_day: true,
        available: true,
      },
    );

    const response = await request(app)
      .delete(`/deliverymans/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const countDocuments = await Deliveryman.find({}).countDocuments();

    expect(response.status).toBe(200);
    expect(countDocuments).toBe(0);
  });

  it('should list a deliveryman by working day', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        working_day: true,
        available: false,
      },
    );
    const deliveryman2 = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'carlos',
        working_day: true,
        available: true,
      },
    );

    const response = await request(app)
      .get(`/deliverymans/working_days`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'carlos',
        }),
      ]),
    );
  });

  it('should list all deliveryman by name', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'jãozin',
        working_day: true,
        available: true,
      },
    );
    const deliveryman2 = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'carlos',
        working_day: true,
        available: true,
      },
    );

    const response = await request(app)
      .get(`/deliverymans/j`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'jãozin',
        }),
      ]),
    );
  });

  it('should list a deliveryman by hasDelivery', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        working_day: true,
        available: false,
      },
    );
    const deliveryman2 = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'carlos',
        working_day: true,
        available: true,
        hasDelivery: true,
      },
    );

    const response = await request(app)
      .get(`/deliverymans/hasDelivery`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'carlos',
        }),
      ]),
    );
  });

  it('should list a deliveryman by available', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        working_day: true,
        available: false,
      },
    );
    const deliveryman2 = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'carlos',
        working_day: true,
        available: true,
      },
    );

    const response = await request(app)
      .get(`/deliverymans/availables`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'carlos',
        }),
      ]),
    );
  });

  it('should list all deliveryman ', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'jãozin',
        working_day: true,
        available: true,
      },
    );
    const deliveryman2 = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'carlos',
        working_day: true,
        available: true,
      },
    );

    const response = await request(app)
      .get(`/deliverymans`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'carlos',
        }),
        expect.objectContaining({
          name: 'jãozin',
        }),
      ]),
    );
  });
});
