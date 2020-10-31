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
describe('should test a update cascade when update a ingredient price', () => {
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
    it('should update a product cost when update a ingredint price', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/ingredients/${ingredient._id}`)
            .send({
            name: ingredient.name,
            price: 2,
            stock: 20,
            description: ingredient.description,
            unit: 'g',
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const productUpdated = await Product_1.default.findOne({ _id: product._id });
        // console.log(response.body);
        // console.log(productUpdated);
        expect(response.status).toBe(200);
        expect(productUpdated === null || productUpdated === void 0 ? void 0 : productUpdated.cost).toBe(20);
    });
    it('should update all products cost when update a ingredint price', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const ingredient = await factories_1.default.create('Ingredient');
        const product = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const product2 = await factories_1.default.create('Product', {
            ingredients: [
                {
                    material: ingredient._id,
                    quantity: 200,
                },
            ],
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/ingredients/${ingredient._id}`)
            .send({
            name: ingredient.name,
            price: 2,
            stock: 20,
            description: ingredient.description,
            unit: 'g',
        })
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const productUpdated = await Product_1.default.findOne({ _id: product._id });
        const productUpdated2 = await Product_1.default.findOne({ _id: product2._id });
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(productUpdated === null || productUpdated === void 0 ? void 0 : productUpdated.cost).toBe(20);
        expect(productUpdated2 === null || productUpdated2 === void 0 ? void 0 : productUpdated2.cost).toBe(20);
    });
});
