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
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
var supertest_1 = __importDefault(require("supertest"));
var connection_1 = require("../utils/connection");
var Ingredient_1 = __importDefault(require("../../src/app/models/Ingredient"));
var Product_1 = __importDefault(require("../../src/app/models/Product"));
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
var subIngredientStock_1 = require("../../src/app/utils/subIngredientStock");
describe('should sub ingredient stock when a order is finished', function () {
    beforeAll(function () {
        connection_1.openConnection();
    });
    afterAll(function () {
        connection_1.closeConnection();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Ingredient_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Product_1.default.deleteMany({})];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should sub a ingredient stock when a order is finished', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, ingredient, product, order, response, ingredientUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            stock: 2000,
                        })];
                case 2:
                    ingredient = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 200,
                                },
                            ],
                        })];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            items: [
                                {
                                    product: product._id,
                                    quantity: 2,
                                },
                            ],
                            finished: false,
                        })];
                case 4:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            finished: true,
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 5:
                    response = _a.sent();
                    return [4 /*yield*/, Ingredient_1.default.findOne({ _id: ingredient._id })];
                case 6:
                    ingredientUpdated = _a.sent();
                    // console.log(ingredientUpdated);
                    expect(response.status).toBe(200);
                    expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(1600);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should sub all product  ingredients stock when a order is finished', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, ingredient, ingredient2, product, order, response, ingredientUpdated, ingredientUpdated2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            stock: 2000,
                        })];
                case 2:
                    ingredient = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            stock: 2200,
                        })];
                case 3:
                    ingredient2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 200,
                                },
                                {
                                    material: ingredient2._id,
                                    quantity: 200,
                                },
                            ],
                        })];
                case 4:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            items: [
                                {
                                    product: product._id,
                                    quantity: 2,
                                },
                            ],
                            finished: false,
                        })];
                case 5:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            finished: true,
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 6:
                    response = _a.sent();
                    return [4 /*yield*/, Ingredient_1.default.findOne({ _id: ingredient._id })];
                case 7:
                    ingredientUpdated = _a.sent();
                    return [4 /*yield*/, Ingredient_1.default.findOne({
                            _id: ingredient2._id,
                        })];
                case 8:
                    ingredientUpdated2 = _a.sent();
                    // console.log(ingredientUpdated);
                    expect(response.status).toBe(200);
                    expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(1600);
                    expect(ingredientUpdated2 === null || ingredientUpdated2 === void 0 ? void 0 : ingredientUpdated2.stock).toBe(1800);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update an ingredient stock with subIngredientStock function', function () { return __awaiter(void 0, void 0, void 0, function () {
        var ingredient, ingredient2, product, product2, orderArray, _i, orderArray_1, item, ingredientUpdated, ingredientUpdated2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Ingredient', {
                        stock: 2000,
                        name: 'farinha',
                    })];
                case 1:
                    ingredient = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            stock: 2000,
                            name: 'Chocolate',
                        })];
                case 2:
                    ingredient2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 200,
                                },
                                {
                                    material: ingredient2._id,
                                    quantity: 200,
                                },
                            ],
                        })];
                case 3:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 400,
                                },
                                {
                                    material: ingredient2._id,
                                    quantity: 100,
                                },
                            ],
                        })];
                case 4:
                    product2 = _a.sent();
                    orderArray = [product, product2];
                    _i = 0, orderArray_1 = orderArray;
                    _a.label = 5;
                case 5:
                    if (!(_i < orderArray_1.length)) return [3 /*break*/, 8];
                    item = orderArray_1[_i];
                    return [4 /*yield*/, subIngredientStock_1.subIngredientStock(item.ingredients, 2)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, Ingredient_1.default.findOne({ _id: ingredient._id })];
                case 9:
                    ingredientUpdated = _a.sent();
                    return [4 /*yield*/, Ingredient_1.default.findOne({
                            _id: ingredient2._id,
                        })];
                case 10:
                    ingredientUpdated2 = _a.sent();
                    expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(800);
                    expect(ingredientUpdated2 === null || ingredientUpdated2 === void 0 ? void 0 : ingredientUpdated2.stock).toBe(1400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should sub all product ingredients stock when a order is finished(same ingredients)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, ingredient, ingredient2, product, product2, order, response, ingredientUpdated, ingredientUpdated2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            stock: 2000,
                            name: 'farinha',
                        })];
                case 2:
                    ingredient = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            stock: 2000,
                            name: 'Chocolate',
                        })];
                case 3:
                    ingredient2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 200,
                                },
                                {
                                    material: ingredient2._id,
                                    quantity: 200,
                                },
                            ],
                        })];
                case 4:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 400,
                                },
                                {
                                    material: ingredient2._id,
                                    quantity: 100,
                                },
                            ],
                        })];
                case 5:
                    product2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            items: [
                                {
                                    product: product._id,
                                    quantity: 2,
                                },
                                {
                                    product: product2._id,
                                    quantity: 3,
                                },
                            ],
                            finished: false,
                        })];
                case 6:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/orders/" + order._id)
                            .send({
                            finished: true,
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 7:
                    response = _a.sent();
                    return [4 /*yield*/, Ingredient_1.default.findOne({ _id: ingredient._id })];
                case 8:
                    ingredientUpdated = _a.sent();
                    return [4 /*yield*/, Ingredient_1.default.findOne({
                            _id: ingredient2._id,
                        })];
                case 9:
                    ingredientUpdated2 = _a.sent();
                    // console.log(ingredientUpdated);
                    expect(response.status).toBe(200);
                    expect(ingredientUpdated === null || ingredientUpdated === void 0 ? void 0 : ingredientUpdated.stock).toBe(400);
                    expect(ingredientUpdated2 === null || ingredientUpdated2 === void 0 ? void 0 : ingredientUpdated2.stock).toBe(1300);
                    return [2 /*return*/];
            }
        });
    }); });
});
