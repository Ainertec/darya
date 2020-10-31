"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const date_fns_1 = require("date-fns");
const connection_1 = require("../utils/connection");
const Order_1 = __importDefault(require("../../src/app/models/Order"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
describe('Reports test', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Order_1.default.deleteMany({});
    });
    it('should list a deliveryman payment by period', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            name: 'Gustavo',
        });
        await factories_1.default.createMany('Order', 3, {
            deliveryman: deliveryman._id,
            finished: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/reports/deliveryman/rate/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
    });
    it('should list all finished orders by deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            name: 'Gustavo',
        });
        await factories_1.default.createMany('Order', 3, {
            deliveryman: deliveryman._id,
            finished: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/reports/deliveryman/orders/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // console.log(response.body);
        expect(response.status).toBe(200);
    });
    it('should not list a deliveryman payment of another days', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            name: 'Gustavo',
        });
        await factories_1.default.createMany('Order', 3, {
            deliveryman: deliveryman._id,
            createdAt: new Date(2020, 6, 12),
            finished: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/reports/deliveryman/rate/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
    it('should list a total profit of the day orders', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const product = await factories_1.default.create('Product');
        await factories_1.default.createMany('Order', 5, {
            total: 200,
            items: [{ product: product._id, quantity: 1 }],
            finished: true,
        });
        const total = 1000;
        const response = await supertest_1.default(app_1.default)
            .get('/reports/orders/profit')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            total: total.toFixed(2),
        }));
        expect(response.body).toHaveProperty('netValue');
    });
    it('should list dispense and gain of all products', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const product = await factories_1.default.create('Product', {
            cost: 10,
        });
        const product1 = await factories_1.default.create('Product');
        const product2 = await factories_1.default.create('Product');
        const product3 = await factories_1.default.create('Product');
        await factories_1.default.createMany('Order', 2, {
            items: [
                {
                    product: product._id,
                    quantity: 3,
                },
                {
                    product: product1._id,
                    quantity: 2,
                },
            ],
            finished: true,
        });
        await factories_1.default.createMany('Order', 2, {
            items: [
                {
                    product: product2._id,
                    quantity: 4,
                },
            ],
            finished: true,
        });
        await factories_1.default.createMany('Order', 2, {
            items: [
                {
                    product: product3._id,
                    quantity: 3,
                },
                {
                    product: product1._id,
                    quantity: 2,
                },
            ],
            finished: true,
        });
        const total = 60;
        const response = await supertest_1.default(app_1.default)
            .get('/reports/products/dispense_gain')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                dispense: total.toFixed(2),
            }),
        ]));
    });
    it('should list an amount of all products', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const product = await factories_1.default.create('Product', {
            cost: 10,
        });
        const product1 = await factories_1.default.create('Product');
        const product2 = await factories_1.default.create('Product');
        const product3 = await factories_1.default.create('Product');
        await factories_1.default.createMany('Order', 2, {
            items: [
                {
                    product: product._id,
                    quantity: 3,
                },
                {
                    product: product1._id,
                    quantity: 2,
                },
            ],
            finished: true,
        });
        await factories_1.default.createMany('Order', 2, {
            items: [
                {
                    product: product2._id,
                    quantity: 4,
                },
            ],
            finished: true,
        });
        await factories_1.default.createMany('Order', 2, {
            items: [
                {
                    product: product3._id,
                    quantity: 3,
                },
                {
                    product: product1._id,
                    quantity: 2,
                },
            ],
            finished: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get('/reports/products/amount')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                amount: 8,
            }),
        ]));
    });
    it('should delete finished order with more than 2 years', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        await factories_1.default.createMany('Order', 3, {
            createdAt: date_fns_1.sub(new Date(), { years: 2 }),
            finished: true,
        });
        await factories_1.default.create('Order');
        const response = await supertest_1.default(app_1.default)
            .delete('/reports')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const sales = await Order_1.default.find().countDocuments();
        expect(response.status).toBe(200);
        expect(sales).toBe(1);
    });
});
