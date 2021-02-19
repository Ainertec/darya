"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../../utils/connection");
const Order_1 = require("../../Entity/Order");
const factories_1 = __importDefault(require("../../utils/factories"));
const soldReportUseCase_1 = require("./SoldPrinter/soldReportUseCase");
const productsAmountUseCase_1 = require("../Report/productsAmountUseCase");
const app_1 = __importDefault(require("../../app"));
const Deliveryman_1 = require("../../Entity/Deliveryman");
describe('Teste a printer', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Order_1.Order.deleteMany({});
        await Deliveryman_1.Deliveryman.deleteMany({});
    });
    it('should return sold reports', async () => {
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Cartão',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Depósito itau',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Cartão',
            finished: true,
        });
        const productsAmount = new productsAmountUseCase_1.ProductAmountUseCase(Order_1.Order);
        const soldPrintUseCase = new soldReportUseCase_1.SoldReportUseCase(Order_1.Order, productsAmount);
        const response = await soldPrintUseCase.execute();
        expect(response).toHaveProperty('countOrders');
    });
    it('should print a general report ', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Cartão',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Depósito itau',
            finished: true,
        });
        await factories_1.default.create('Order', {
            payment: 'Cartão',
            finished: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get('/printers/sold_report')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
    it('should print a deliveryman report ', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            name: 'Celestino',
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
            deliveryman: deliveryman._id,
        });
        await factories_1.default.create('Order', {
            payment: 'Cartão',
            finished: true,
            deliveryman: deliveryman._id,
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
            deliveryman: deliveryman._id,
        });
        await factories_1.default.create('Order', {
            payment: 'Dinheiro',
            finished: true,
            deliveryman: deliveryman._id,
        });
        await factories_1.default.create('Order', {
            payment: 'Depósito itau',
            finished: true,
            deliveryman: deliveryman._id,
        });
        await factories_1.default.create('Order', {
            payment: 'Cartão',
            finished: true,
            deliveryman: deliveryman._id,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/printers/deliveryman_report/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
});
