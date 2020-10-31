"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../utils/connection");
const User_1 = __importDefault(require("../../src/app/models/User"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
describe('User tests', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await User_1.default.deleteMany({});
    });
    it('should create a user', async () => {
        const distric = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
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
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Cleiton',
        }));
    });
    it('should create a user without phone', async () => {
        const distric = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
            address: [
                {
                    district: distric._id,
                    street: 'Encontro dos Rios',
                    reference: 'Pousada encontro dos rios',
                },
            ],
        });
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Cleiton',
        }));
    });
    it('should create a user without address', async () => {
        // const distric = await factory.create<DistrictInterface>('District');
        const response = await supertest_1.default(app_1.default).post('/users').send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
        });
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Cleiton',
        }));
    });
    it('should not create a user with the same name and phone number', async () => {
        const district = await factories_1.default.create('District');
        await factories_1.default.create('User', {
            name: 'Cleiton',
            phone: ['22992865120', '22992726852'],
        });
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
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
    it('should not create a admin user without auth user', async () => {
        const distric = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
            admin: true,
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
        expect(response.body).toEqual(expect.objectContaining({
            admin: false,
        }));
    });
    it('should create a admin user', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const distric = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
            admin: true,
            address: [
                {
                    district: distric._id,
                    street: 'Encontro dos Rios',
                    reference: 'Pousada encontro dos rios',
                },
            ],
            phone: ['22 992726852', '22 992865120'],
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            admin: true,
        }));
    });
    it('should not create a admin user with auth user without admin privileges', async () => {
        const user = await factories_1.default.create('User', {
            admin: false,
        });
        const distric = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
            admin: true,
            address: [
                {
                    district: distric._id,
                    street: 'Encontro dos Rios',
                    reference: 'Pousada encontro dos rios',
                },
            ],
            phone: ['22 992726852', '22 992865120'],
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            admin: false,
        }));
    });
    it('should not create a should not create a user if the username already exists', async () => {
        const user = await factories_1.default.create('User', {
            admin: false,
            username: 'cleitonbalonekr',
        });
        const distric = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .post('/users')
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
            admin: true,
            address: [
                {
                    district: distric._id,
                    street: 'Encontro dos Rios',
                    reference: 'Pousada encontro dos rios',
                },
            ],
            phone: ['22 992726852', '22 992865120'],
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(400);
    });
    it('should update a user', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const distric = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .put(`/users/${user._id}`)
            .send({
            name: 'Cleiton',
            username: 'cleitonbalonekr',
            password: '1231234',
            question: 'Qual o nome da sua mãe?',
            response: 'não sei',
            address: [
                {
                    district: distric._id,
                    street: 'Estrada Serra Mar Encontro dos Rios',
                    number: 0,
                },
            ],
            phone: ['22 992726852', '22 992865120'],
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Cleiton',
        }));
    });
    it('should update a user without phone number', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        const user2 = await factories_1.default.create('User');
        const distric = await factories_1.default.create('District');
        // console.log('client no teste', client);
        const response = await supertest_1.default(app_1.default)
            .put(`/users/${user2._id}`)
            .send({
            name: 'Cleiton',
            address: [
                {
                    district: distric._id,
                    street: 'Estrada Serra Mar Encontro dos Rios',
                    number: 0,
                },
            ],
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Cleiton',
        }));
    });
    it('should update a user without address', async () => {
        const user = await factories_1.default.create('User');
        const distric = await factories_1.default.create('District');
        // console.log('user no teste', user);
        const response = await supertest_1.default(app_1.default)
            .put(`/users/${user._id}`)
            .send({
            name: 'Cleiton',
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Cleiton',
        }));
    });
    it('should not update an inexistent client', async () => {
        const user = await factories_1.default.create('User');
        const response = await supertest_1.default(app_1.default)
            .put(`/users/5f06fefdd0607c2cde1b9cc2`)
            .send({
            name: 'Cleiton',
            address: user.address,
            phone: ['22 992726852', '22 992865120 '],
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(400);
    });
    it('should update a auth user', async () => {
        const user = await factories_1.default.create('User', { admin: false });
        const user2 = await factories_1.default.create('User', {
            admin: false,
            name: 'joaçda',
            username: 'cleber',
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/users/${user2.id}`)
            .send({ username: 'cleitonbalonekr' })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
    it('should delete a user', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        const user1 = await factories_1.default.create('User');
        const response = await supertest_1.default(app_1.default)
            .delete(`/users/${user1._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const countDocuments = await User_1.default.find();
        expect(response.status).toBe(200);
        expect(countDocuments.length).toBe(1);
    });
    it('should list all users', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        await factories_1.default.createMany('User', 4);
        await factories_1.default.create('User', {
            name: 'Cleiton',
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/users`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'Cleiton',
            }),
        ]));
    });
    it('should list all users by name', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        await factories_1.default.createMany('User', 4);
        await factories_1.default.create('User', {
            name: 'Cleiton',
        });
        await factories_1.default.create('User', {
            name: 'jaõ',
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/users/cle`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'Cleiton',
            }),
        ]));
    });
    it('should list all users by phone', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        await factories_1.default.createMany('User', 4);
        await factories_1.default.create('User', {
            name: 'Cleiton',
            phone: ['992865120', '992726852'],
        });
        await factories_1.default.create('User', {
            name: 'Jão Kleber',
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/users/99272`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'Cleiton',
            }),
        ]));
    });
});
