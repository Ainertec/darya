/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { closeConnection, openConnection } from '../../utils/connection';
import {
  Client,
  IClient,
  IClientDocument,
  IDistrict,
} from '../../Entity/Client';
import app from '../../app';
import factory from '../../utils/factories';
import { District } from '../../Entity/District';

describe('Client test', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Client.deleteMany({});
    await District.deleteMany({});
  });

  it('should create a client', async () => {
    const distric = await factory.create<IDistrict>('District');

    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Cleiton',
        username: 'cleitonbalonekr',
        password: 'c992865120',
        question: 'Qual o nome da sua mãe?',
        response: 'não sei',
        address: [
          {
            district: distric._id,
            street: 'Encontro dos Rios',
            reference: 'Pousada encontro dos rios',
          },
        ],
        phone: ['22 992726852', '22 992865120'],
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      }),
    );
  });

  it('should list a client questions', async () => {
    const response = await request(app).get('/clients/questions');
    expect(response.status).toBe(200);
  });

  it('should create a client without phone', async () => {
    const distric = await factory.create<IDistrict>('District');

    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Cleiton',
        question: 'Qual o nome da sua mãe?',
        response: 'não sei',
        username: 'cleitonbalonekr',
        password: 'c992865120',
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
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      }),
    );
  });

  it('should create a client without address', async () => {
    // const distric = await factory.create<DistrictInterface>('District');

    const response = await request(app).post('/clients').send({
      name: 'Cleiton',
      username: 'cleitonbalonekr',
      password: 'c992865120',
      question: 'Qual o nome da sua mãe?',
      response: 'não sei',
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
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      }),
    );
  });

  it('should not create a client with the same name and phone number', async () => {
    const district = await factory.create<IDistrict>('District');
    await factory.create<IClient>('Client', {
      name: 'Cleiton',
      phone: ['22992865120', '22992726852'],
    });

    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Cleiton',
        question: 'Qual o nome da sua mãe?',
        response: 'não sei',
        username: 'cleitonbalonekr',
        password: 'c992865120',
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

  it('should not create a client with invalid question', async () => {
    const district = await factory.create<IDistrict>('District');

    const response = await request(app)
      .post('/clients')
      .send({
        name: 'Cleiton',
        question: 'Qual o nome da sua ?',
        response: 'não sei',
        username: 'cleitonbalonekr',
        password: 'c992865120',
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
    const client = await factory.create<IClientDocument>('Client');
    const distric = await factory.create<IDistrict>('District');

    const response = await request(app)
      .put(`/clients`)
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
      })
      .set('Authorization', `Bearer ${client.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      }),
    );
  });

  it('should update a client without phone number', async () => {
    const client = await factory.create<IClientDocument>('Client');
    const distric = await factory.create<IDistrict>('District');
    // console.log('client no teste', client);
    const response = await request(app)
      .put(`/clients`)
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
      })
      .set('Authorization', `Bearer ${client.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      }),
    );
  });

  it('should update a client without address', async () => {
    const client = await factory.create<IClientDocument>('Client');

    const response = await request(app)
      .put(`/clients`)
      .send({
        name: 'Cleiton',
      })
      .set('Authorization', `Bearer ${client.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      }),
    );
  });
});
