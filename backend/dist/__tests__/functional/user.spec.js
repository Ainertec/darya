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
var User_1 = __importDefault(require("../../src/app/models/User"));
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
describe('User tests', function () {
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
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('District')];
                case 1:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Encontro dos Rios',
                                    reference: 'Pousada encontro dos rios',
                                },
                            ],
                            phone: ['22 992726852', '22 992865120'],
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Cleiton',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a user without phone', function () { return __awaiter(void 0, void 0, void 0, function () {
        var distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('District')];
                case 1:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Encontro dos Rios',
                                    reference: 'Pousada encontro dos rios',
                                },
                            ],
                        })];
                case 2:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Cleiton',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a user without address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).post('/users').send({
                        name: 'Cleiton',
                        username: 'cleitonbalonekr',
                        password: '1231234',
                        question: 'Qual o nome da sua mãe?',
                        response: 'não sei',
                    })];
                case 1:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Cleiton',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a user with the same name and phone number', function () { return __awaiter(void 0, void 0, void 0, function () {
        var district, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('District')];
                case 1:
                    district = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            name: 'Cleiton',
                            phone: ['22992865120', '22992726852'],
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            address: [
                                {
                                    district: district._id,
                                    street: 'Encontro dos Rios',
                                    reference: 'Pousada encontro dos rios',
                                },
                            ],
                            phone: ['22992865120', '22134123412'],
                        })];
                case 3:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a admin user without auth user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('District')];
                case 1:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            admin: true,
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Encontro dos Rios',
                                    reference: 'Pousada encontro dos rios',
                                },
                            ],
                            phone: ['22 992726852', '22 992865120'],
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        admin: false,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a admin user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 2:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            admin: true,
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Encontro dos Rios',
                                    reference: 'Pousada encontro dos rios',
                                },
                            ],
                            phone: ['22 992726852', '22 992865120'],
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        admin: true,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a admin user with auth user without admin privileges', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: false,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 2:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            admin: true,
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Encontro dos Rios',
                                    reference: 'Pousada encontro dos rios',
                                },
                            ],
                            phone: ['22 992726852', '22 992865120'],
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        admin: false,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a should not create a user if the username already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: false,
                        username: 'cleitonbalonekr',
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 2:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            admin: true,
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Encontro dos Rios',
                                    reference: 'Pousada encontro dos rios',
                                },
                            ],
                            phone: ['22 992726852', '22 992865120'],
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 2:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/users/" + user._id)
                            .send({
                            name: 'Cleiton',
                            username: 'cleitonbalonekr',
                            password: '1231234',
                            question: 'Qual o nome da sua mãe?',
                            response: 'não sei',
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Estrada Serra Mar Encontro dos Rios',
                                    number: 0,
                                },
                            ],
                            phone: ['22 992726852', '22 992865120'],
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Cleiton',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a user without phone number', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user2, distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User')];
                case 2:
                    user2 = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 3:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/users/" + user2._id)
                            .send({
                            name: 'Cleiton',
                            address: [
                                {
                                    district: distric._id,
                                    street: 'Estrada Serra Mar Encontro dos Rios',
                                    number: 0,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Cleiton',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a user without address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, distric, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User')];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('District')];
                case 2:
                    distric = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/users/" + user._id)
                            .send({
                            name: 'Cleiton',
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    // console.log(response.body);
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Cleiton',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update an inexistent client', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User')];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/users/5f06fefdd0607c2cde1b9cc2")
                            .send({
                            name: 'Cleiton',
                            address: user.address,
                            phone: ['22 992726852', '22 992865120 '],
                        })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a auth user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user2, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: false })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            admin: false,
                            name: 'joaçda',
                            username: 'cleber',
                        })];
                case 2:
                    user2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/users/" + user2.id)
                            .send({ username: 'cleitonbalonekr' })
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, user1, response, countDocuments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User')];
                case 2:
                    user1 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .delete("/users/" + user1._id)
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, User_1.default.find()];
                case 4:
                    countDocuments = _a.sent();
                    expect(response.status).toBe(200);
                    expect(countDocuments.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('User', 4)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            name: 'Cleiton',
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/users")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'Cleiton',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all users by name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('User', 4)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            name: 'Cleiton',
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            name: 'jaõ',
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/users/cle")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 5:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'Cleiton',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all users by phone', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', { admin: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('User', 4)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            name: 'Cleiton',
                            phone: ['992865120', '992726852'],
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('User', {
                            name: 'Jão Kleber',
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/users/99272")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 5:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'Cleiton',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
});
