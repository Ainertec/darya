"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../../utils/connection");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Order_1 = require("../../Entity/Order");
const app_1 = __importDefault(require("../../app"));
const factories_1 = __importDefault(require("../../utils/factories"));
describe('Teste a printer', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Order_1.Order.deleteMany({});
    });
    it('Should print a recipe without address', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const order = await factories_1.default.create('Order', {
            address: undefined,
        });
        const response = await supertest_1.default(app_1.default)
            .post('/printers')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            id: order.id,
        });
        expect(response.status).toBe(200);
        setTimeout(async () => {
            await fs_1.default.unlinkSync(path_1.default.resolve(__dirname, 'recipes', `${order._id}.rtf`));
        }, 1000);
    });
    it('Should print a recipe without a user phone', async () => {
        const user2 = await factories_1.default.create('User', {
            admin: true,
        });
        const user = await factories_1.default.create('User');
        const order = await factories_1.default.create('Order', {
            address: undefined,
            deliveryman: undefined,
            user: {
                name: 'cleiton',
                user_id: user._id,
                phone: undefined,
            },
        });
        const response = await supertest_1.default(app_1.default)
            .post('/printers')
            .set('Authorization', `Bearer ${user2.generateToken()}`)
            .send({
            id: order.id,
        });
        expect(response.status).toBe(200);
        setTimeout(async () => {
            await fs_1.default.unlinkSync(path_1.default.resolve(__dirname, 'recipes', `${order._id}.rtf`));
        }, 1000);
    });
    it('Should print a recipe without deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const order = await factories_1.default.create('Order', {
            address: undefined,
            deliveryman: undefined,
        });
        const response = await supertest_1.default(app_1.default)
            .post('/printers')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            id: order.id,
        });
        expect(response.status).toBe(200);
        setTimeout(async () => {
            await fs_1.default.unlinkSync(path_1.default.resolve(__dirname, 'recipes', `${order._id}.rtf`));
        }, 1000);
    });
    it('Should print a recipe', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const order = await factories_1.default.create('Order');
        const response = await supertest_1.default(app_1.default)
            .post('/printers')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            id: order.id,
        });
        expect(response.status).toBe(200);
        setTimeout(async () => {
            await fs_1.default.unlinkSync(path_1.default.resolve(__dirname, 'recipes', `${order._id}.rtf`));
        }, 1000);
    });
    it('Should not print a recipe with invalid order', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const order = await factories_1.default.create('Order');
        const response = await supertest_1.default(app_1.default)
            .post('/printers')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            id: '5f05febbd43fb02cb0b83d64',
        });
        expect(response.status).toBe(400);
    });
});
