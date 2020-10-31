"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../utils/connection");
const Product_1 = __importDefault(require("../../src/app/models/Product"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
describe('should test a product', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Product_1.default.deleteMany({});
    });
    it('should create a product', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient', {
            price: 5,
            stock: 2000,
            priceUnit: 5 / 2000,
        });
        const response = await supertest_1.default(app_1.default)
            .post('/products')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'roquinha',
            price: 4.5,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 500,
                },
            ],
            available: true,
            description: 'como que é o nome daquele negocio?',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            cost: 1.25,
        }));
    });
    it('should update a product', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const product = await factories_1.default.create('Product');
        const ingredient = await factories_1.default.create('Ingredient', {
            price: 5,
            stock: 2000,
            priceUnit: 5 / 2000,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/products/${product._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'roquinha',
            price: product.price,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 500,
                },
            ],
            description: product.description,
        });
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'roquinha',
            cost: 1.25,
        }));
    });
    it('should delete a product', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const product = await factories_1.default.create('Product');
        const response = await supertest_1.default(app_1.default)
            .delete(`/products/${product._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const countDocuments = await Product_1.default.find({}).countDocuments();
        expect(response.status).toBe(200);
        expect(countDocuments).toBe(0);
    });
    it('should list products by name includes unavailable', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        await factories_1.default.create('Product', {
            name: 'pizza',
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'pão',
            available: false,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'queijo',
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/products/p`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'pizza',
            }),
            expect.objectContaining({
                name: 'pão',
            }),
        ]));
    });
    it('should list products by name available', async () => {
        const user = await factories_1.default.create('User', {
            admin: false,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        await factories_1.default.create('Product', {
            name: 'pizza',
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'pão',
            available: false,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'queijo',
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/products/p`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'pizza',
            }),
        ]));
    });
    it('should list all products includes unavailable ', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        await factories_1.default.create('Product', {
            name: 'pizza',
            available: false,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'pão',
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'queijo',
            available: false,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/products`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'pizza',
            }),
            expect.objectContaining({
                name: 'pão',
            }),
            expect.objectContaining({
                name: 'queijo',
            }),
        ]));
    });
    it('should list all products available', async () => {
        const user = await factories_1.default.create('User', {
            admin: false,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        await factories_1.default.create('Product', {
            name: 'pizza',
            available: false,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'pão',
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        await factories_1.default.create('Product', {
            name: 'queijo',
            available: false,
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/products`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.body.length).toBe(1);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'pão',
            }),
        ]));
    });
});
