"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../../../../__tests__/utils/connection");
const User_1 = __importDefault(require("../../models/User"));
const app_1 = __importDefault(require("../../../app"));
const factories_1 = __importDefault(require("../../../../__tests__/factories"));
describe('Session Tests', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await User_1.default.deleteMany({});
    });
    it('it should authenticate a user', async () => {
        await factories_1.default.create('User', {
            username: 'Cleiton',
            password: '123456',
        });
        const response = await supertest_1.default(app_1.default).post('/sessions').send({
            username: 'Cleiton',
            password: '123456',
        });
        expect(response.status).toBe(200);
    });
    it('it should not authenticate a user with invalid password', async () => {
        await factories_1.default.create('User', {
            name: 'Cleiton',
            password: '123456',
        });
        const response = await supertest_1.default(app_1.default).post('/sessions').send({
            name: 'Cleiton',
            password: '214123',
        });
        expect(response.status).toBe(401);
    });
    it('it should not authenticate a user with invalid name', async () => {
        await factories_1.default.create('User', {
            name: 'Cleiton',
            password: '123456',
        });
        const response = await supertest_1.default(app_1.default).post('/sessions').send({
            name: 'Marcos',
            password: '123456',
        });
        expect(response.status).toBe(401);
    });
    it('it should return a Jwt token when authenticate', async () => {
        await factories_1.default.create('User', {
            username: 'Cleiton',
            password: '123456',
        });
        const response = await supertest_1.default(app_1.default).post('/sessions').send({
            username: 'Cleiton',
            password: '123456',
        });
        expect(response.body).toHaveProperty('token');
        expect(response.status).toBe(200);
    });
    it('it should be able to access private routes', async () => {
        const user = await factories_1.default.create('User', {
            name: 'Cleiton',
            password: '123456',
            admin: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get('/users')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
    it('it should not be able to access private routes without a jwt token', async () => {
        await factories_1.default.create('User', {
            name: 'Cleiton',
            password: '123456',
        });
        const response = await supertest_1.default(app_1.default).get('/users');
        expect(response.status).toBe(401);
    });
    it('it should not be able to access private routes with invalid jwt token', async () => {
        await factories_1.default.create('User', {
            name: 'Cleiton',
            password: '123456',
        });
        const response = await supertest_1.default(app_1.default)
            .get('/users')
            .set('Authorization', `askfhi34ax}`);
        expect(response.status).toBe(401);
    });
});
