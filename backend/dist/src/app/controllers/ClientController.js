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
var Client_1 = __importDefault(require("../models/Client"));
var ClientController = /** @class */ (function () {
    function ClientController() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    ClientController.prototype.clientNameValidation = function (name, phone) {
        return __awaiter(this, void 0, void 0, function () {
            var clientWithSameName, hasSamePhone_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Client_1.default.findOne({ name: name })];
                    case 1:
                        clientWithSameName = _a.sent();
                        if (clientWithSameName) {
                            hasSamePhone_1 = false;
                            phone.forEach(function (element) {
                                if (clientWithSameName.phone.includes(element)) {
                                    hasSamePhone_1 = true;
                                    return;
                                }
                            });
                            if (hasSamePhone_1)
                                return [2 /*return*/, 'Client has the same name and phone number'];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Client_1.default.find().populate('address.district')];
                    case 1:
                        clients = _a.sent();
                        return [2 /*return*/, response.json(clients)];
                }
            });
        });
    };
    ClientController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, clients;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.params.name;
                        return [4 /*yield*/, Client_1.default.find({
                                name: { $regex: new RegExp(name), $options: 'i' },
                            }).populate('address.district')];
                    case 1:
                        clients = _a.sent();
                        return [2 /*return*/, response.json(clients)];
                }
            });
        });
    };
    ClientController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, address, phone, isInvalidName, client;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, address = _a.address, phone = _a.phone;
                        return [4 /*yield*/, this.clientNameValidation(name, phone)];
                    case 1:
                        isInvalidName = _b.sent();
                        if (isInvalidName) {
                            return [2 /*return*/, response.status(400).json(isInvalidName)];
                        }
                        return [4 /*yield*/, Client_1.default.create({
                                name: name,
                                address: address,
                                phone: phone,
                            })];
                    case 2:
                        client = _b.sent();
                        return [4 /*yield*/, client.populate('address.district').execPopulate()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.json(client)];
                }
            });
        });
    };
    ClientController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, address, phone, id, client, isInvalidName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, address = _a.address, phone = _a.phone;
                        id = request.params.id;
                        return [4 /*yield*/, Client_1.default.findOneAndUpdate({ _id: id }, {
                                address: address,
                                phone: phone,
                            }, { new: true })];
                    case 1:
                        client = _b.sent();
                        if (!client)
                            return [2 /*return*/, response.status(400).json('Client does not exist')];
                        if (!name) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.clientNameValidation(name, phone)];
                    case 2:
                        isInvalidName = _b.sent();
                        if (isInvalidName) {
                            return [2 /*return*/, response.status(400).json(isInvalidName)];
                        }
                        else {
                            client.name = name;
                        }
                        _b.label = 3;
                    case 3: return [4 /*yield*/, client.save()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, client.populate('address.district').execPopulate()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, response.json(client)];
                }
            });
        });
    };
    ClientController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, Client_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                }
            });
        });
    };
    return ClientController;
}());
exports.default = new ClientController();