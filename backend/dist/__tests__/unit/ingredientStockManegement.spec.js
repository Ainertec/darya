"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../utils/connection");
const Ingredient_1 = __importDefault(require("../../src/app/models/Ingredient"));
const Product_1 = __importDefault(require("../../src/app/models/Product"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
const subIngredientStock_1 = require("../../src/app/utils/subIngredientStock");
describe('should sub ingredient stock when a order is finished', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Ingredient_1.default.deleteMany({});
        await Product_1.default.deleteMany({});
    });
    it('should sub a ingredient stock when a order is finished', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        const ingredient = await factories_1.default.create('Ingredient', {
            stock: 2000,
        });
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const order = await factories_1.default.create('Order', {
            items: [
                {
                    product: product._id,
                    quantity: 2,
                },
            ],
            finished: false,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/orders/${order._id}`)
            .send({
            finished: true,
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const ingredientUpdated = await Ingredient_1.default.findOne({ _id: ingredient._id });
        // console.log(ingredientUpdated);
        expect(response.status).toBe(200);
        expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(1600);
    });
    it('should sub all product  ingredients stock when a order is finished', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        const ingredient = await factories_1.default.create('Ingredient', {
            stock: 2000,
        });
        const ingredient2 = await factories_1.default.create('Ingredient', {
            stock: 2200,
        });
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
                {
                    material: ingredient2._id,
                    quantity: 200,
                },
            ],
        });
        const order = await factories_1.default.create('Order', {
            items: [
                {
                    product: product._id,
                    quantity: 2,
                },
            ],
            finished: false,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/orders/${order._id}`)
            .send({
            finished: true,
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const ingredientUpdated = await Ingredient_1.default.findOne({ _id: ingredient._id });
        const ingredientUpdated2 = await Ingredient_1.default.findOne({
            _id: ingredient2._id,
        });
        // console.log(ingredientUpdated);
        expect(response.status).toBe(200);
        expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(1600);
        expect(ingredientUpdated2 === null || ingredientUpdated2 === void 0 ? void 0 : ingredientUpdated2.stock).toBe(1800);
    });
    it('should update an ingredient stock with subIngredientStock function', async () => {
        const ingredient = await factories_1.default.create('Ingredient', {
            stock: 2000,
            name: 'farinha',
        });
        const ingredient2 = await factories_1.default.create('Ingredient', {
            stock: 2000,
            name: 'Chocolate',
        });
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
                {
                    material: ingredient2._id,
                    quantity: 200,
                },
            ],
        });
        const product2 = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 400,
                },
                {
                    material: ingredient2._id,
                    quantity: 100,
                },
            ],
        });
        const orderArray = [product, product2];
        for (const item of orderArray) {
            await subIngredientStock_1.subIngredientStock(item.ingredients, 2);
        }
        const ingredientUpdated = await Ingredient_1.default.findOne({ _id: ingredient._id });
        const ingredientUpdated2 = await Ingredient_1.default.findOne({
            _id: ingredient2._id,
        });
        expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(800);
        expect(ingredientUpdated2 === null || ingredientUpdated2 === void 0 ? void 0 : ingredientUpdated2.stock).toBe(1400);
    });
    it('should sub all product ingredients stock when a order is finished(same ingredients)', async () => {
        const user = await factories_1.default.create('User', { admin: true });
        const ingredient = await factories_1.default.create('Ingredient', {
            stock: 2000,
            name: 'farinha',
        });
        const ingredient2 = await factories_1.default.create('Ingredient', {
            stock: 2000,
            name: 'Chocolate',
        });
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
                {
                    material: ingredient2._id,
                    quantity: 200,
                },
            ],
        });
        const product2 = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 400,
                },
                {
                    material: ingredient2._id,
                    quantity: 100,
                },
            ],
        });
        const order = await factories_1.default.create('Order', {
            items: [
                {
                    product: product._id,
                    quantity: 2,
                },
                {
                    product: product2._id,
                    quantity: 3,
                },
            ],
            finished: false,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/orders/${order._id}`)
            .send({
            finished: true,
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const ingredientUpdated = await Ingredient_1.default.findOne({ _id: ingredient._id });
        const ingredientUpdated2 = await Ingredient_1.default.findOne({
            _id: ingredient2._id,
        });
        // console.log(ingredientUpdated);
        expect(response.status).toBe(200);
        expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(400);
        expect(ingredientUpdated2 === null || ingredientUpdated2 === void 0 ? void 0 : ingredientUpdated2.stock).toBe(1300);
    });
});
