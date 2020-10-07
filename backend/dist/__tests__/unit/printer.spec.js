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
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var Order_1 = __importDefault(require("../../src/app/models/Order"));
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
describe('Teste a printer', function () {
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
    it('Should print a recipe without address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            address: undefined,
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/printers')
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            id: order.id,
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '..', 'recipes', order._id + ".rtf"))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should print a recipe without a user phone', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user2, user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User')];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            address: undefined,
                            deliveryman: undefined,
                            user: {
                                name: 'cleiton',
                                user_id: user._id,
                                phone: undefined,
                            },
                        })];
                case 3:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/printers')
                            .set('Authorization', "Bearer " + user2.generateToken())
                            .send({
                            id: order.id,
                        })];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '..', 'recipes', order._id + ".rtf"))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should print a recipe without deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            address: undefined,
                            deliveryman: undefined,
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/printers')
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            id: order.id,
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '..', 'recipes', order._id + ".rtf"))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should print a recipe', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/printers')
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            id: order.id,
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '..', 'recipes', order._id + ".rtf"))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should not print a recipe with invalid order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order')];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/printers')
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            id: '5f05febbd43fb02cb0b83d64',
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
