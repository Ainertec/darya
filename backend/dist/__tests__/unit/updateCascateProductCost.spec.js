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
var Ingredient_1 = __importDefault(require("../../src/app/models/Ingredient"));
var Product_1 = __importDefault(require("../../src/app/models/Product"));
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
describe('should test a update cascade when update a ingredient price', function () {
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
    it('should update a product cost when update a ingredint price', function () { return __awaiter(void 0, void 0, void 0, function () {
        var ingredient, product, response, productUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Ingredient')];
                case 1:
                    ingredient = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 200,
                                },
                            ],
                        })];
                case 2:
                    product = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/ingredients/" + ingredient._id)
                            .send({
                            name: ingredient.name,
                            price: 2,
                            stock: 20,
                            description: ingredient.description,
                            unit: 'g',
                        })];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, Product_1.default.findOne({ _id: product._id })];
                case 4:
                    productUpdated = _a.sent();
                    // console.log(response.body);
                    // console.log(productUpdated);
                    expect(response.status).toBe(200);
                    expect(productUpdated === null || productUpdated === void 0 ? void 0 : productUpdated.cost).toBe(20);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update all products cost when update a ingredint price', function () { return __awaiter(void 0, void 0, void 0, function () {
        var ingredient, product, product2, response, productUpdated, productUpdated2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('Ingredient')];
                case 1:
                    ingredient = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 200,
                                },
                            ],
                        })];
                case 2:
                    product = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Product', {
                            ingredients: [
                                {
                                    material: ingredient._id,
                                    quantity: 200,
                                },
                            ],
                        })];
                case 3:
                    product2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/ingredients/" + ingredient._id)
                            .send({
                            name: ingredient.name,
                            price: 2,
                            stock: 20,
                            description: ingredient.description,
                            unit: 'g',
                        })];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, Product_1.default.findOne({ _id: product._id })];
                case 5:
                    productUpdated = _a.sent();
                    return [4 /*yield*/, Product_1.default.findOne({ _id: product2._id })];
                case 6:
                    productUpdated2 = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(productUpdated === null || productUpdated === void 0 ? void 0 : productUpdated.cost).toBe(20);
                    expect(productUpdated2 === null || productUpdated2 === void 0 ? void 0 : productUpdated2.cost).toBe(20);
                    return [2 /*return*/];
            }
        });
    }); });
});