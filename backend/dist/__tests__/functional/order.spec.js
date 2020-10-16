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
/* eslint-disable no-unneeded-ternary */
var supertest_1 = __importDefault(require("supertest"));
var connection_1 = require("../utils/connection");
var User_1 = __importDefault(require("../../src/app/models/User"));
var Order_1 = __importDefault(require("../../src/app/models/Order"));
var Deliveryman_1 = __importDefault(require("../../src/app/models/Deliveryman"));
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
describe('should a User', function () {
    beforeAll(function () {
        connection_1.openConnection();
    });
    afterAll(function () {
        connection_1.closeConnection();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.deleteMany({})];
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
        var user, use2, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            admin: true,
                            name: 'Cleiton',
                        })];
                case 2:
                    use2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 3:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            price: 10,
                        })];
                case 4:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            user_id: user._id,
                            deliveryman: deliveryman._id,
                            user_address_id: user.address[0]._id,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                            viewed: false,
                        })
                            .set('Authorization', "Bearer " + use2.generateToken())];
                case 5:
                    response = _a.sent();
                    expect(response.body.user.name).toEqual(user.name);
                    expect(response.body).toHaveProperty('total');
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create an order with authenticated user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, use2, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: false })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            admin: false,
                            name: 'Cleiton',
                        })];
                case 2:
                    use2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 3:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            price: 10,
                        })];
                case 4:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            user_id: user._id,
                            deliveryman: deliveryman._id,
                            user_address_id: user.address[0]._id,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })
                            .set('Authorization', "Bearer " + use2.generateToken())];
                case 5:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.user.name).toEqual(use2.name);
                    expect(response.body).toHaveProperty('total');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a deliveryman hasDelivery when create a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, products, response, deliverymanUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            user_id: user._id,
                            deliveryman: deliveryman._id,
                            user_address_id: user.address[0]._id,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
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
        var user, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 4:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            user_id: user._id,
                            deliveryman: deliveryman._id,
                            user_address_id: user.address[0]._id,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'nada',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 5:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create an order with invalid user_address_id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            user_id: user._id,
                            deliveryman: deliveryman._id,
                            user_address_id: '5f05febbd43fb02cb0b83d64',
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create an order with invalid user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            user_id: '5f05febbd43fb02cb0b83d64',
                            deliveryman: deliveryman._id,
                            user_address_id: user.address[0]._id,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create an order with invalid deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, products, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/orders')
                            .send({
                            user_id: user._id,
                            deliveryman: '5f05febbd43fb02cb0b83d64',
                            user_address_id: user.address[0]._id,
                            items: [
                                {
                                    product: products._id,
                                    quantity: 5,
                                },
                            ],
                            source: 'Ifood',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, user, product, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Order')];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                            price: 10,
                        })];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            user_id: order.user.user_id,
                            deliveryman: order.deliveryman,
                            user_address_id: order.address.user_address_id,
                            note: 'Brabo',
                            source: 'Whatsapp',
                            items: [
                                {
                                    product: product._id,
                                    quantity: 12,
                                },
                            ],
                            viewed: true,
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.body).toHaveProperty('total');
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        source: 'Whatsapp',
                        identification: '1234567',
                        note: 'Brabo',
                        viewed: true,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order total with address change', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response, isEqual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('District')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            user: {
                                user_id: user._id,
                                name: 'Marcos',
                                phone: ['1324'],
                            },
                        })];
                case 3:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            user_address_id: user.address[0]._id,
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
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
        var user, deliveryman, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            deliveryman: deliveryman._id,
                        })];
                case 3:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            finished: true,
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        finished: true,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order and update a deliveryman available', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, delivaryman, order, product, response, deliverymanUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            available: false,
                        })];
                case 2:
                    delivaryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            deliveryman: delivaryman._id,
                        })];
                case 3:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 4:
                    product = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            user_id: order.user.user_id,
                            deliveryman: order.deliveryman,
                            user_address_id: order.address.user_address_id,
                            note: 'Brabo',
                            payment: 'Dinheiro',
                            source: 'Whatsapp',
                            items: [
                                {
                                    product: product._id,
                                    quantity: 12,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 5:
                    response = _a.sent();
                    return [4 /*yield*/, Deliveryman_1.default.findOne({
                            _id: delivaryman._id,
                        })];
                case 6:
                    deliverymanUpdated = _a.sent();
                    expect(response.status).toBe(200);
                    expect(deliverymanUpdated === null || deliverymanUpdated === void 0 ? void 0 : deliverymanUpdated.available).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order user and address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        name: 'Cleiton',
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            user_id: user._id,
                            deliveryman: order.deliveryman,
                            user_address_id: user.address[0]._id,
                            note: 'Brabo',
                            source: 'Whatsapp',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        source: 'Whatsapp',
                        identification: '1234567',
                        note: 'Brabo',
                        user: expect.objectContaining({
                            name: 'Cleiton',
                        }),
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a order user invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        name: 'Cleiton',
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            user_id: '5f05febbd43fb02cb0b83d64',
                            deliveryman: order.deliveryman,
                            user_address_id: user.address[0]._id,
                            note: 'Brabo',
                            total: 100,
                            source: 'Whatsapp',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a order address invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        name: 'Cleiton',
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            identification: '1234567',
                            deliveryman: order.deliveryman,
                            user_address_id: '5f05febbd43fb02cb0b83d64',
                            note: 'Brabo',
                            total: 100,
                            source: 'Whatsapp',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a inexistent order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, user, product, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Order')];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            name: 'Chocolate',
                        })];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/5f08ae43157a8a40bae90fd7")
                            .send({
                            identification: '1234567',
                            user_id: order.user.user_id,
                            deliveryman: order.deliveryman,
                            user_address_id: order.address.user_address_id,
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
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Order')];
                case 1:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .delete("/orders/" + order._id)
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.createMany('Order', 3, {
                        finished: false,
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/orders")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a order by identification', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, user, response;
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
                    return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 3:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/orders/" + order.identification)
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
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
        var deliveryman, user, response;
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
                    return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 4:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/orders/deliveryman/" + deliveryman._id)
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 5:
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
    it('should list a order by user id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User')];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 3, { finished: false })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman')];
                case 3:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            deliveryman: deliveryman._id,
                            user: { user_id: user._id, name: user.name },
                            identification: '123123',
                            finished: false,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/orders/user/")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 5:
                    response = _a.sent();
                    expect(response.status).toBe(200);
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
