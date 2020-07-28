import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Client from '../../src/app/models/Client';
import app from '../../src/app';
import factory from '../factories';

import { ClientInterface, DistrictInterface } from '../../src/interfaces/base';

describe('should a Client', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Client.deleteMany({});
  });

  it('should create a client', async () => {
    const distric = await factory.create<DistrictInterface>('District');

    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Cleiton',
        address: [
          {
            district: distric._id,
            street: 'Encontro dos Rios',
            reference: 'Pousada encontro dos rios',
          },
        ],
        phone: ['22 992726852', '22 992865120'],
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
  });

  it('should create a client without phone', async () => {
    const distric = await factory.create<DistrictInterface>('District');

    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Cleiton',
        address: [
          {
            district: distric._id,
            street: 'Encontro dos Rios',
            reference: 'Pousada encontro dos rios',
          },
        ],
        // phone: ['22 992726852', '22 992865120'],
      });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
  });

  it('should create a client without address', async () => {
    // const distric = await factory.create<DistrictInterface>('District');

    const response = await request(app).post('/clients').send({
      name: 'Cleiton',
      // address: [
      //   {
      //     district: distric._id,
      //     street: 'Encontro dos Rios',
      //     reference: 'Pousada encontro dos rios',
      //   },
      // ],
      // phone: ['22 992726852', '22 992865120'],
    });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
  });

  it('should not create a client with the same name and phone number', async () => {
    const district = await factory.create<DistrictInterface>('District');
    const client = await factory.create<ClientInterface>('Client', {
      name: 'Cleiton',
      phone: ['22992865120', '22992726852'],
    });

    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Cleiton',
        address: [
          {
            district: district._id,
            street: 'Encontro dos Rios',
            reference: 'Pousada encontro dos rios',
          },
        ],
        phone: ['22992865120', '22134123412'],
      });
    // console.log(response.body);
    expect(response.status).toBe(400);
  });

  it('should update a client', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const distric = await factory.create<DistrictInterface>('District');
    const response = await request(app)
      .put(`/clients/${client._id}`)
      .send({
        name: 'Cleiton',
        address: [
          {
            district: distric._id,
            street: 'Estrada Serra Mar Encontro dos Rios',
            number: 0,
          },
        ],
        phone: ['22 992726852', '22 992865120'],
      });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
  });

  it('should update a client without phone number', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const distric = await factory.create<DistrictInterface>('District');
    // console.log('client no teste', client);
    const response = await request(app)
      .put(`/clients/${client._id}`)
      .send({
        name: 'Cleiton',
        address: [
          {
            district: distric._id,
            street: 'Estrada Serra Mar Encontro dos Rios',
            number: 0,
          },
        ],
        // phone: ['22 992726852', '22 992865120'],
      });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
  });

  it('should update a client without address', async () => {
    const client = await factory.create<ClientInterface>('Client');
    const distric = await factory.create<DistrictInterface>('District');
    // console.log('client no teste', client);
    const response = await request(app).put(`/clients/${client._id}`).send({
      name: 'Cleiton',
      // address: [
      //   {
      //     district: distric._id,
      //     street: 'Estrada Serra Mar Encontro dos Rios',
      //     number: 0,
      //   },
      // ],
      // phone: ['22 992726852', '22 992865120'],
    });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
  });

  it('should not update an inexistent client', async () => {
    const client = await factory.create<ClientInterface>('Client');

    const response = await request(app)
      .put(`/clients/5f06fefdd0607c2cde1b9cc2`)
      .send({
        name: 'Cleiton',
        address: client.address,
        phone: ['22 992726852', '22 992865120 '],
      });

    expect(response.status).toBe(400);
  });

  it('should delete a client', async () => {
    const client = await factory.create<ClientInterface>('Client');

    const response = await request(app).delete(`/clients/${client._id}`);
    const countDocuments = await Client.find({}).countDocuments();
    expect(response.status).toBe(200);
    expect(countDocuments).toBe(0);
  });

  it('should list all clients', async () => {
    await factory.createMany<ClientInterface>('Client', 4);
    await factory.create<ClientInterface>('Client', {
      name: 'Cleiton',
    });

    const response = await request(app).get(`/clients`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Cleiton',
        }),
      ])
    );
  });

  it('should list all clients by name', async () => {
    await factory.createMany<ClientInterface>('Client', 4);
    await factory.create<ClientInterface>('Client', {
      name: 'Cleiton',
    });

    const response = await request(app).get(`/clients/cle`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Cleiton',
        }),
      ])
    );
  });
});
