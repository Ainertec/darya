"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../../../../__tests__/utils/connection");
const Order_1 = __importDefault(require("../../models/Order"));
const factories_1 = __importDefault(require("../../../../__tests__/factories"));
const soldReportUseCase_1 = require("./SoldPrinter/soldReportUseCase");
const productsAmountUseCase_1 = require("../Report/productsAmountUseCase");
const app_1 = __importDefault(require("../../../app"));
const Deliveryman_1 = __importDefault(require("../../models/Deliveryman"));
describe('Teste a printer', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Order_1.default.deleteMany({});
        await Deliveryman_1.default.deleteMany({});
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
        const productsAmount = new productsAmountUseCase_1.ProductAmountUseCase(Order_1.default);
        const soldPrintUseCase = new soldReportUseCase_1.SoldReportUseCase(Order_1.default, productsAmount);
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
