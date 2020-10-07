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
var Deliveryman_1 = __importDefault(require("../../src/app/models/Deliveryman"));
var app_1 = __importDefault(require("../../src/app"));
var factories_1 = __importDefault(require("../factories"));
var User_1 = __importDefault(require("../../src/app/models/User"));
describe('should test', function () {
    beforeAll(function () {
        connection_1.openConnection();
    });
    afterAll(function () {
        connection_1.closeConnection();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Deliveryman_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, User_1.default.deleteMany({})];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/deliverymans')
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            name: 'Jão',
                            working_day: false,
                            phone: '99726852',
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            working_day: true,
                            available: true,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/deliverymans/" + deliveryman._id)
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            name: 'Paulo',
                            phone: deliveryman.phone,
                            working_day: true,
                            available: false,
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Paulo',
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update an available field of a deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            working_day: false,
                            available: false,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/deliverymans/" + deliveryman._id)
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            available: true,
                            phone: deliveryman.phone,
                            name: 'Paulo',
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Paulo',
                        available: true,
                        working_day: false,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a working_day field of a deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            working_day: false,
                            available: false,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/deliverymans/" + deliveryman._id)
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            working_day: true,
                            phone: deliveryman.phone,
                            name: 'Paulo',
                        })];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.objectContaining({
                        name: 'Paulo',
                        available: false,
                        working_day: true,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update a field of an inexistent deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/deliverymans/5f05febbd43fb02cb0b83d64")
                            .set('Authorization', "Bearer " + user.generateToken())
                            .send({
                            working_day: true,
                            name: 'Paulo',
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reset an available field and working day of all deliverymans', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, response, delivery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'Jão',
                            working_day: true,
                            available: true,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put("/deliverymans")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, Deliveryman_1.default.findOne({})];
                case 4:
                    delivery = _a.sent();
                    expect(response.status).toBe(200);
                    expect(delivery).toEqual(expect.objectContaining({
                        name: 'Jão',
                        working_day: false,
                        available: false,
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete a deliveryman', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, response, countDocuments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            working_day: true,
                            available: true,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .delete("/deliverymans/" + deliveryman._id)
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, Deliveryman_1.default.find({}).countDocuments()];
                case 4:
                    countDocuments = _a.sent();
                    expect(response.status).toBe(200);
                    expect(countDocuments).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a deliveryman by working day', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, deliveryman2, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            working_day: true,
                            available: false,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'carlos',
                            working_day: true,
                            available: true,
                        })];
                case 3:
                    deliveryman2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/deliverymans/working_days")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'carlos',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all deliveryman by name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, deliveryman2, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'jãozin',
                            working_day: true,
                            available: true,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'carlos',
                            working_day: true,
                            available: true,
                        })];
                case 3:
                    deliveryman2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/deliverymans/j")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'jãozin',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a deliveryman by hasDelivery', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, deliveryman2, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            working_day: true,
                            available: false,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'carlos',
                            working_day: true,
                            available: true,
                            hasDelivery: true,
                        })];
                case 3:
                    deliveryman2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/deliverymans/hasDelivery")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'carlos',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list a deliveryman by available', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, deliveryman2, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            working_day: true,
                            available: false,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'carlos',
                            working_day: true,
                            available: true,
                        })];
                case 3:
                    deliveryman2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/deliverymans/availables")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'carlos',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all deliveryman ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deliveryman, deliveryman2, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factories_1.default.create('User', {
                        admin: true,
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'jãozin',
                            working_day: true,
                            available: true,
                        })];
                case 2:
                    deliveryman = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Deliveryman', {
                            name: 'carlos',
                            working_day: true,
                            available: true,
                        })];
                case 3:
                    deliveryman2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .get("/deliverymans")
                            .set('Authorization', "Bearer " + user.generateToken())];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(expect.arrayContaining([
                        expect.objectContaining({
                            name: 'carlos',
                        }),
                        expect.objectContaining({
                            name: 'jãozin',
                        }),
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
});
