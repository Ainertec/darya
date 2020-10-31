"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../utils/connection");
const Ingredient_1 = __importDefault(require("../../src/app/models/Ingredient"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
describe('should test a ingredient', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Ingredient_1.default.deleteMany({});
    });
    it('should create a ingredient', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const response = await supertest_1.default(app_1.default)
            .post('/ingredients')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'chocolate',
            price: 2.0,
            stock: 20,
            unit: 'g',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            priceUnit: 0.1,
        }));
    });
    it('should not create a ingredient with a invalid unit', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const response = await supertest_1.default(app_1.default)
            .post('/ingredients')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'chocolate',
            price: 2.0,
            stock: 20,
            unit: 'lkl',
        });
        expect(response.status).toBe(400);
    });
    it('should update  a ingredient', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const response = await supertest_1.default(app_1.default)
            .put(`/ingredients/${ingredient._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'chocolate',
            price: 2.0,
            stock: 20,
            unit: 'g',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            priceUnit: 0.1,
        }));
    });
    it('should not update a ingredient with invalid unit', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const response = await supertest_1.default(app_1.default)
            .put(`/ingredients/${ingredient._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'chocolate',
            price: 2.0,
            stock: 20,
            unit: 'as',
        });
        expect(response.status).toBe(400);
    });
    it('should delete a ingredient', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const response = await supertest_1.default(app_1.default)
            .delete(`/ingredients/${ingredient._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
    it('should list all ingredients', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        await factories_1.default.createMany('Ingredient', 4);
        const response = await supertest_1.default(app_1.default)
            .get('/ingredients')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(4);
    });
    it('should list all ingredients by name', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        await factories_1.default.create('Ingredient', {
            name: 'Farinha',
        });
        await factories_1.default.create('Ingredient', {
            name: 'Chocolate',
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/ingredients/far`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'Farinha',
            }),
        ]));
    });
});
