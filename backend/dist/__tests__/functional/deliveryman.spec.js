"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../utils/connection");
const Deliveryman_1 = __importDefault(require("../../src/app/models/Deliveryman"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
const User_1 = __importDefault(require("../../src/app/models/User"));
describe('should test', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await Deliveryman_1.default.deleteMany({});
        await User_1.default.deleteMany({});
    });
    it('should create a deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const response = await supertest_1.default(app_1.default)
            .post('/deliverymans')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'Jão',
            working_day: false,
            phone: '99726852',
        });
        expect(response.status).toBe(200);
    });
    it('should update a deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            working_day: true,
            available: true,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/deliverymans/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'Paulo',
            phone: deliveryman.phone,
            working_day: true,
            available: false,
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Paulo',
        }));
    });
    it('should update an available field of a deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            working_day: false,
            available: false,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/deliverymans/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            available: true,
            phone: deliveryman.phone,
            name: 'Paulo',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Paulo',
            available: true,
            working_day: false,
        }));
    });
    it('should update a working_day field of a deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            working_day: false,
            available: false,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/deliverymans/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            working_day: true,
            phone: deliveryman.phone,
            name: 'Paulo',
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Paulo',
            available: false,
            working_day: true,
        }));
    });
    it('should not update a field of an inexistent deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/deliverymans/5f05febbd43fb02cb0b83d64`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            working_day: true,
            name: 'Paulo',
        });
        expect(response.status).toBe(400);
    });
    it('should reset an available field and working day of all deliverymans', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            name: 'Jão',
            working_day: true,
            available: true,
        });
        const response = await supertest_1.default(app_1.default)
            .put(`/deliverymans`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const delivery = await Deliveryman_1.default.findOne({});
        expect(response.status).toBe(200);
        expect(delivery).toEqual(expect.objectContaining({
            name: 'Jão',
            working_day: false,
            available: false,
        }));
    });
    it('should delete a deliveryman', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            working_day: true,
            available: true,
        });
        const response = await supertest_1.default(app_1.default)
            .delete(`/deliverymans/${deliveryman._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const countDocuments = await Deliveryman_1.default.find({}).countDocuments();
        expect(response.status).toBe(200);
        expect(countDocuments).toBe(0);
    });
    it('should list a deliveryman by working day', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            working_day: true,
            available: false,
        });
        const deliveryman2 = await factories_1.default.create('Deliveryman', {
            name: 'carlos',
            working_day: true,
            available: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/deliverymans/working_days`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'carlos',
            }),
        ]));
    });
    it('should list all deliveryman by name', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            name: 'jãozin',
            working_day: true,
            available: true,
        });
        const deliveryman2 = await factories_1.default.create('Deliveryman', {
            name: 'carlos',
            working_day: true,
            available: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/deliverymans/j`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'jãozin',
            }),
        ]));
    });
    it('should list a deliveryman by hasDelivery', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            working_day: true,
            available: false,
        });
        const deliveryman2 = await factories_1.default.create('Deliveryman', {
            name: 'carlos',
            working_day: true,
            available: true,
            hasDelivery: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/deliverymans/hasDelivery`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'carlos',
            }),
        ]));
    });
    it('should list a deliveryman by available', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            working_day: true,
            available: false,
        });
        const deliveryman2 = await factories_1.default.create('Deliveryman', {
            name: 'carlos',
            working_day: true,
            available: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/deliverymans/availables`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'carlos',
            }),
        ]));
    });
    it('should list all deliveryman ', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const deliveryman = await factories_1.default.create('Deliveryman', {
            name: 'jãozin',
            working_day: true,
            available: true,
        });
        const deliveryman2 = await factories_1.default.create('Deliveryman', {
            name: 'carlos',
            working_day: true,
            available: true,
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/deliverymans`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'carlos',
            }),
            expect.objectContaining({
                name: 'jãozin',
            }),
        ]));
    });
});
