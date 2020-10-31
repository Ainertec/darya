"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../utils/connection");
const Ingredient_1 = __importDefault(require("../../src/app/models/Ingredient"));
const Product_1 = __importDefault(require("../../src/app/models/Product"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
describe('should test a delete cascade when delete a ingredient', () => {
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
    it('should delete a product ingredient when a ingredient is deleted', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const ingredient2 = await factories_1.default.create('Ingredient');
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 300,
                },
                {
                    material: ingredient2._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .delete(`/ingredients/${ingredient._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const productUpdated = await Product_1.default.findOne({ _id: product._id });
        expect(productUpdated === null || productUpdated === void 0 ? void 0 : productUpdated.ingredients.length).toBe(1);
        expect(response.status).toBe(200);
    });
    it('should delete a unic product ingredient when a ingredient is deleted', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 300,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .delete(`/ingredients/${ingredient._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const productUpdated = await Product_1.default.findOne({ _id: product._id });
        expect(productUpdated === null || productUpdated === void 0 ? void 0 : productUpdated.ingredients.length).toBe(0);
        expect(response.status).toBe(200);
    });
    it('should not delete a product ingredient when a ingredient is deleted, if it does not use it', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const ingredient2 = await factories_1.default.create('Ingredient');
        const ingredient3 = await factories_1.default.create('Ingredient');
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 300,
                },
                {
                    material: ingredient2._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .delete(`/ingredients/${ingredient3._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const productUpdated = await Product_1.default.findOne({ _id: product._id });
        expect(productUpdated === null || productUpdated === void 0 ? void 0 : productUpdated.ingredients.length).toBe(2);
        expect(response.status).toBe(200);
    });
});
