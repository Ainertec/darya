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
describe('Reset password', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await User_1.default.deleteMany({});
    });
    it('should be able to get user question', async () => {
        const user = await factories_1.default.create('User', {
            username: 'cleiton',
            question: 'Qual o modelo do seu primeiro carro?',
            response: 'cledir',
        });
        const response = await supertest_1.default(app_1.default).get(`/forgot/${user.username}`);
        expect(response.body).toEqual(expect.objectContaining({
            question: user.question,
        }));
    });
    it('should not get user question with invalid user', async () => {
        const response = await supertest_1.default(app_1.default).get(`/forgot/geovane`);
        expect(response.status).toBe(400);
    });
    it('should rest password', async () => {
        const user = await factories_1.default.create('User', {
            username: 'cleiton',
            question: 'Qual o modelo do seu primeiro carro?',
            response: 'cledir',
            password: '1234',
        });
        const response = await supertest_1.default(app_1.default).post('/forgot').send({
            username: user.username,
            response: 'cledir',
            password: '92865120',
        });
        expect(response.status).toBe(200);
        const userReseted = await User_1.default.findOne({ username: user.username });
        if (userReseted) {
            const validPassword = await userReseted.checkPassword('92865120');
            expect(validPassword).toBe(true);
        }
    });
    it('should not reset password with incorrect user name', async () => {
        await factories_1.default.create('User', {
            name: 'cleiton',
            question: 'Qual o modelo do seu primeiro carro?',
            response: 'cledir',
        });
        const response = await supertest_1.default(app_1.default).post('/forgot').send({
            name: 'Json',
            response: 'Maria Clara',
            password: '92865120',
        });
        expect(response.status).toBe(400);
    });
    it('should not reset password with incorrect response for user question', async () => {
        const user = await factories_1.default.create('User', {
            name: 'cleiton',
            question: 'Qual o modelo do seu primeiro carro?',
            response: 'cledir',
        });
        const response = await supertest_1.default(app_1.default).post('/forgot').send({
            name: user.name,
            response: 'Maria Clara',
            password: '92865120',
        });
        expect(response.status).toBe(400);
    });
});
