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
var User_1 = __importDefault(require("../models/User"));
var UserController = /** @class */ (function () {
    function UserController() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    UserController.prototype.userNameValidation = function (name, phone) {
        return __awaiter(this, void 0, void 0, function () {
            var userWithSameName, hasSamePhone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ name: name })];
                    case 1:
                        userWithSameName = _a.sent();
                        if (!userWithSameName || !userWithSameName.phone)
                            return [2 /*return*/];
                        hasSamePhone = false;
                        phone.forEach(function (element) {
                            var _a;
                            if ((_a = userWithSameName.phone) === null || _a === void 0 ? void 0 : _a.includes(element)) {
                                hasSamePhone = true;
                            }
                        });
                        if (hasSamePhone)
                            return [2 /*return*/, 'User has the same name and phone number'];
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.find().populate('address.district')];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, response.json(users)];
                }
            });
        });
    };
    UserController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.params.name;
                        return [4 /*yield*/, User_1.default.find({
                                $or: [
                                    {
                                        phone: { $regex: new RegExp(name), $options: 'i' },
                                    },
                                    {
                                        name: { $regex: new RegExp(name), $options: 'i' },
                                    },
                                ],
                            }).populate('address.district')];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, response.json(users)];
                }
            });
        });
    };
    UserController.prototype.store = function (request, responseHttp) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, address, phone, password, question, response, username, admin, userId, userAdm, sameUsername, isInvalidName, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, address = _a.address, phone = _a.phone, password = _a.password, question = _a.question, response = _a.response, username = _a.username, admin = _a.admin;
                        userId = request.userId;
                        return [4 /*yield*/, User_1.default.findOne({ _id: userId })];
                    case 1:
                        userAdm = _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({ username: username })];
                    case 2:
                        sameUsername = _b.sent();
                        if (sameUsername) {
                            return [2 /*return*/, responseHttp.status(400).json('That username already exist')];
                        }
                        if (!phone) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userNameValidation(name, phone)];
                    case 3:
                        isInvalidName = _b.sent();
                        if (isInvalidName) {
                            return [2 /*return*/, responseHttp.status(400).json(isInvalidName)];
                        }
                        _b.label = 4;
                    case 4: return [4 /*yield*/, User_1.default.create({
                            name: name,
                            address: address || undefined,
                            phone: phone || undefined,
                            password: password,
                            question: question,
                            response: response,
                            username: username,
                            admin: !userId || !userAdm.admin ? false : admin,
                        })];
                    case 5:
                        user = _b.sent();
                        return [4 /*yield*/, user.populate('address.district').execPopulate()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, responseHttp.json(user)];
                }
            });
        });
    };
    UserController.prototype.update = function (request, responseHttp) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, address, phone, password, username, admin, question, response, id, userId, authUser, userToUpdate, user, isInvalidName, isInvalidName, alreadyExists;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, address = _a.address, phone = _a.phone, password = _a.password, username = _a.username, admin = _a.admin, question = _a.question, response = _a.response;
                        id = request.params.id;
                        userId = request.userId;
                        return [4 /*yield*/, User_1.default.findOne({ _id: userId })];
                    case 1:
                        authUser = _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({ _id: id })];
                    case 2:
                        userToUpdate = _b.sent();
                        user = authUser.admin ? userToUpdate : authUser;
                        if (!user)
                            return [2 /*return*/, response.status(400).json('user does not exist')];
                        if (!(name && !phone && user.phone)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userNameValidation(name, user.phone)];
                    case 3:
                        isInvalidName = _b.sent();
                        if (isInvalidName) {
                            return [2 /*return*/, response.status(400).json(isInvalidName)];
                        }
                        user.name = name;
                        _b.label = 4;
                    case 4:
                        if (!(name && phone)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userNameValidation(name, phone)];
                    case 5:
                        isInvalidName = _b.sent();
                        if (isInvalidName) {
                            return [2 /*return*/, responseHttp.status(400).json(isInvalidName)];
                        }
                        user.name = name;
                        _b.label = 6;
                    case 6:
                        if (phone) {
                            user.phone = phone;
                        }
                        if (address) {
                            user.address = address;
                        }
                        if (password) {
                            user.password = password;
                        }
                        if (question) {
                            user.question = question;
                        }
                        if (response) {
                            user.response = response;
                        }
                        if (admin && user.admin) {
                            user.admin = admin;
                        }
                        if (!username) return [3 /*break*/, 8];
                        return [4 /*yield*/, User_1.default.findOne({ username: username })];
                    case 7:
                        alreadyExists = _b.sent();
                        if (alreadyExists) {
                            return [2 /*return*/, response.status(400).json('This username already exist')];
                        }
                        user.username = username;
                        _b.label = 8;
                    case 8: return [4 /*yield*/, user.save()];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, user.populate('address.district').execPopulate()];
                    case 10:
                        _b.sent();
                        return [2 /*return*/, responseHttp.json(user)];
                }
            });
        });
    };
    UserController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, User_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
