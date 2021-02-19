"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = require("../utils/connection");
const District_1 = __importDefault(require("../../src/app/models/District"));
const app_1 = __importDefault(require("../../src/app"));
const factories_1 = __importDefault(require("../factories"));
describe('should test', () => {
    beforeAll(() => {
        connection_1.openConnection();
    });
    afterAll(() => {
        connection_1.closeConnection();
    });
    beforeEach(async () => {
        await District_1.default.deleteMany({});
    });
    it('should create a district', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const response = await supertest_1.default(app_1.default)
            .post('/districts')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'Lumiar',
            city: 'Nova Friburgo',
            rate: 10,
        });
        expect(response.status).toBe(200);
    });
    it('should update a district', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const district = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .put(`/districts/${district._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send({
            name: 'Lumiar',
            city: district.city,
            rate: 10,
        });
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: 'Lumiar',
            rate: 10,
        }));
    });
    it('should delete a district', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const district = await factories_1.default.create('District');
        const response = await supertest_1.default(app_1.default)
            .delete(`/districts/${district._id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        const countDocuments = await District_1.default.find({}).countDocuments();
        expect(response.status).toBe(200);
        // expect(countDocuments).toBe(0);
    });
    it('should list all districts', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const district = await factories_1.default.create('District', {
            name: 'Lumiar',
        });
        const district2 = await factories_1.default.create('District', {
            name: 'São Pedro',
        });
        const response = await supertest_1.default(app_1.default)
            .get('/districts')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'Lumiar',
            }),
            expect.objectContaining({
                name: 'São Pedro',
            }),
        ]));
    });
    it('should list all districts by name', async () => {
        const user = await factories_1.default.create('User', {
            admin: true,
        });
        const district = await factories_1.default.create('District', {
            name: 'São Thiagua',
        });
        const district2 = await factories_1.default.create('District', {
            name: 'São Pedro',
        });
        const response = await supertest_1.default(app_1.default)
            .get(`/districts/s`)
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: 'São Thiagua',
            }),
            expect.objectContaining({
                name: 'São Pedro',
            }),
        ]));
    });
});
