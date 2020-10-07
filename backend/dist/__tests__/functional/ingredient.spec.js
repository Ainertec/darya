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
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
describe('should test a ingredient', function () {
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
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a ingredient', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/ingredients')
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            name: 'chocolate',
                            price: 2.0,
                            stock: 20,
                            unit: 'g',
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        priceUnit: 0.1,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a ingredient with a invalid unit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/ingredients')
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            name: 'chocolate',
                            price: 2.0,
                            stock: 20,
                            unit: 'lkl',
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update  a ingredient', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, ingredient, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient')];
                case 2:
                    ingredient = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/ingredients/" + ingredient._id)
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            name: 'chocolate',
                            price: 2.0,
                            stock: 20,
                            unit: 'g',
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        priceUnit: 0.1,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a ingredient with invalid unit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, ingredient, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient')];
                case 2:
                    ingredient = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/ingredients/" + ingredient._id)
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            name: 'chocolate',
                            price: 2.0,
                            stock: 20,
                            unit: 'as',
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete a ingredient', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, ingredient, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient')];
                case 2:
                    ingredient = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .delete("/ingredients/" + ingredient._id)
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all ingredients', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Ingredient', 4)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get('/ingredients')
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.length).toBe(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all ingredients by name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            name: 'Farinha',
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Ingredient', {
                            name: 'Chocolate',
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/ingredients/far")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'Farinha',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
});
