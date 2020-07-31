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
var date_fns_1 = require("date-fns");
var connection_1 = require("../utils/connection");
var Order_1 = __importDefault(require("../../src/app/models/Order"));
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
                case 0: return [4 /*yield*/, Order_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a deliveryman payment by period', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                        name: 'Gustavo',
                    })];
                case 1:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 3, {
                            deliveryman: deliveryman._id,
                            finished: true,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get("/reports/deliveryman/rate/" + deliveryman._id)];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all finished orders by deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                        name: 'Gustavo',
                    })];
                case 1:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 3, {
                            deliveryman: deliveryman._id,
                            finished: true,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get("/reports/deliveryman/orders/" + deliveryman._id)];
                case 3:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not list a deliveryman payment of another days', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                        name: 'Gustavo',
                    })];
                case 1:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 3, {
                            deliveryman: deliveryman._id,
                            createdAt: new Date(2020, 6, 12),
                            finished: true,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get("/reports/deliveryman/rate/" + deliveryman._id)];
                case 3:
                    response = _a.sent();
                    expect(response.body.length).toBe(0);
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a total profit of the day orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product, total, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Product')];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 5, {
                            total: 200,
                            items: [{ product: product._id, quantity: 1 }],
                            finished: true,
                        })];
                case 2:
                    _a.sent();
                    total = 1000;
                    return [4 /*yield*/, supertest_1.default(app_1.default).get('/reports/orders/profit')];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        total: total.toFixed(2),
                    }));
                    expect(response.body).toHaveProperty('netValue');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list dispense and gain of all products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product, product1, product2, product3, total, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Product', { cost: 10 })];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 2:
                    product1 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    product2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 4:
                    product3 = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 2, {
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
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 2, {
                            items: [
                                {
                                    product: product2._id,
                                    quantity: 4,
                                },
                            ],
                            finished: true,
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 2, {
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
                        })];
                case 7:
                    _a.sent();
                    total = 60;
                    return [4 /*yield*/, supertest_1.default(app_1.default).get('/reports/products/dispense_gain')];
                case 8:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            dispense: total.toFixed(2),
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list an amount of all products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product, product1, product2, product3, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Product', { cost: 10 })];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 2:
                    product1 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 3:
                    product2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product')];
                case 4:
                    product3 = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 2, {
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
                        })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 2, {
                            items: [
                                {
                                    product: product2._id,
                                    quantity: 4,
                                },
                            ],
                            finished: true,
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 2, {
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
                        })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).get('/reports/products/amount')];
                case 8:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            amount: 8,
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete finished order with more than 2 years', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, sales;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.createMany('Order', 3, {
                        createdAt: date_fns_1.sub(new Date(), { years: 2 }),
                        finished: true,
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default).delete('/reports')];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, Order_1.default.find().countDocuments()];
                case 4:
                    sales = _a.sent();
                    expect(response.status).toBe(200);
                    expect(sales).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
