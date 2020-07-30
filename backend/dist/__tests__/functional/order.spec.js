"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var connection_1 = require("../utils/connection");
var Client_1 = __importDefault(require("../../src/app/models/Client"));
var Order_1 = __importDefault(require("../../src/app/models/Order"));
var Deliveryman_1 = __importDefault(require("../../src/app/models/Deliveryman"));
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
describe('should a Client', function () {
    beforeAll(function () {
        connection_1.openConnection();
    });
    afterAll(function () {
        connection_1.closeConnection();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Client_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Deliveryman_1.default.deleteMany({})];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Order_1.default.deleteMany({})];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, deliveryman, products, address, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', { price: 10 })];
                case 3:
                    products = _a.sent();
                    address = client.address ? client.address[0]._id : undefined;
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: client._id,
                            deliveryman: deliveryman._id,
                            client_address_id: address,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })];
                case 4:
                    response = _a.sent();
                    // console.log('teste', response.body);
                    expect(response.body).toHaveProperty('total');
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create an order without a address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', { price: 10 })];
                case 2:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: client._id,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })];
                case 3:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.body).toHaveProperty('total');
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create an order without a deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', { price: 10 })];
                case 2:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: client._id,
                            // deliveryman: deliveryman._id,
                            client_address_id: client.address ? client.address[0]._id : undefined,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })];
                case 3:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.body).toHaveProperty('total');
                    expect(response.body).toEqual(expect.objectContaining({
                        deliveryman: null,
                    }));
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a deliveryman hasDelivery when create a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, deliveryman, products, response, deliverymanUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: client._id,
                            deliveryman: deliveryman._id,
                            client_address_id: client.address ? client.address[0]._id : undefined,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, Deliveryman_1.default.findOne({ _id: deliveryman })];
                case 5:
                    deliverymanUpdated = _a.sent();
                    expect(response.status).toBe(200);
                    expect(deliverymanUpdated).toEqual(expect.objectContaining({
                        hasDelivery: true,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create an order with invalid source', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, deliveryman, district, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 3:
                    district = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 4:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: client._id,
                            deliveryman: deliveryman._id,
                            client_address_id: client.address ? client.address[0]._id : undefined,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'nada',
                        })];
                case 5:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create an order with invalid client_address_id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: client._id,
                            deliveryman: deliveryman._id,
                            client_address_id: '5f05febbd43fb02cb0b83d64',
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create an order with invalid client', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: '5f05febbd43fb02cb0b83d64',
                            deliveryman: deliveryman._id,
                            client_address_id: client.address ? client.address[0]._id : undefined,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create an order with invalid deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client')];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            client_id: client._id,
                            deliveryman: '5f05febbd43fb02cb0b83d64',
                            client_address_id: client.address ? client.address[0]._id : undefined,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, product, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Order')];
                case 1:
                    order = _b.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                            price: 10,
                        })];
                case 2:
                    product = _b.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            client_id: order.client.client_id,
                            deliveryman: order.deliveryman,
                            client_address_id: (_a = order.address) === null || _a === void 0 ? void 0 : _a.client_address_id,
                            note: 'Brabo',
                            source: 'Whatsapp',
                            items: [
                                {
                                    product: product._id,
                                    quantity: 12,
                                },
                            ],
                        })];
                case 3:
                    response = _b.sent();
                    // console.log(response.body);
                    expect(response.body).toHaveProperty('total');
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        source: 'Whatsapp',
                        identification: '1234567',
                        note: 'Brabo',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order total with address change', function () { return __awaiter(void 0, void 0, void 0, function () {
        var district, client, order, response, isEqual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('District')];
                case 1:
                    district = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Client')];
                case 2:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            client: {
                                client_id: client._id,
                                name: 'asdf',
                                phone: ['1324'],
                            },
                        })];
                case 3:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            client_address_id: client.address ? client.address[0]._id : undefined,
                        })];
                case 4:
                    response = _a.sent();
                    isEqual = order.total === response.body.total ? true : false;
                    expect(response.body).toHaveProperty('total');
                    expect(response.status).toBe(200);
                    expect(isEqual).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should finish a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deliveryman, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 1:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', { deliveryman: deliveryman._id })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).put("/orders/" + order._id).send({
                            finished: true,
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        finished: true,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should finish a order with a invalid deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deliveryman, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 1:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', { deliveryman: deliveryman._id })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).put("/orders/" + order._id).send({
                            finished: true,
                            deliveryman: '5f05febbd43fb02cb0b83d64',
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order and update a deliveryman available', function () { return __awaiter(void 0, void 0, void 0, function () {
        var delivaryman, order, product, response, deliverymanUpdated;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                        available: false,
                    })];
                case 1:
                    delivaryman = _b.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            deliveryman: delivaryman._id,
                        })];
                case 2:
                    order = _b.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    product = _b.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            client_id: order.client.client_id,
                            deliveryman: order.deliveryman,
                            client_address_id: (_a = order.address) === null || _a === void 0 ? void 0 : _a.client_address_id,
                            note: 'Brabo',
                            payment: 'Dinheiro',
                            source: 'Whatsapp',
                            items: [
                                {
                                    product: product._id,
                                    quantity: 12,
                                },
                            ],
                        })];
                case 4:
                    response = _b.sent();
                    return [4 /*yield*/, Deliveryman_1.default.findOne({ _id: delivaryman._id })];
                case 5:
                    deliverymanUpdated = _b.sent();
                    expect(response.status).toBe(200);
                    expect(deliverymanUpdated === null || deliverymanUpdated === void 0 ? void 0 : deliverymanUpdated.available).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order client and address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, order, product, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client', { name: 'Cleiton' })];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            client_id: client._id,
                            deliveryman: order.deliveryman,
                            client_address_id: client.address ? client.address[0]._id : undefined,
                            note: 'Brabo',
                            source: 'Whatsapp',
                        })];
                case 4:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        source: 'Whatsapp',
                        identification: '1234567',
                        note: 'Brabo',
                        client: expect.objectContaining({
                            name: 'Cleiton',
                        }),
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a order client invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, order, product, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client', { name: 'Cleiton' })];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            client_id: '5f05febbd43fb02cb0b83d64',
                            deliveryman: order.deliveryman,
                            client_address_id: client.address ? client.address[0]._id : undefined,
                            note: 'Brabo',
                            total: 100,
                            source: 'Whatsapp',
                        })];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a order address invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, order, product, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Client', { name: 'Cleiton' })];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).put("/orders/" + order._id).send({
                            identification: '1234567',
                            deliveryman: order.deliveryman,
                            client_address_id: '5f05febbd43fb02cb0b83d64',
                            note: 'Brabo',
                            total: 100,
                            source: 'Whatsapp',
                        })];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a inexistent order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, product, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Order')];
                case 1:
                    order = _b.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 2:
                    product = _b.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/5f08ae43157a8a40bae90fd7")
                            .send({
                            identification: '1234567',
                            client_id: order.client.client_id,
                            deliveryman: order.deliveryman,
                            client_address_id: (_a = order.address) === null || _a === void 0 ? void 0 : _a.client_address_id,
                            note: 'Brabo',
                            total: 100,
                            source: 'Whatsapp',
                            finished: true,
                            items: [
                                {
                                    product: product._id,
                                    quantity: 12,
                                },
                            ],
                        })];
                case 3:
                    response = _b.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Order')];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).delete("/orders/" + order._id)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.createMany('Order', 3, { finished: false })];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get("/orders")];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a order by identification', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.createMany('Order', 3, { finished: false })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            identification: '1234543',
                            finished: false,
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get("/orders/" + order.identification)];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        identification: '1234543',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a order by deliveryman identification', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.createMany('Order', 3, { finished: false })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            deliveryman: deliveryman._id,
                            identification: '123123',
                            finished: false,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get("/orders/deliveryman/" + deliveryman._id)];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    // console.log(response.body);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            identification: '123123',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
});
