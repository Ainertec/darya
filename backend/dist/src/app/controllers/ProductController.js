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
var Product_1 = __importDefault(require("../models/Product"));
var getProductCost_1 = __importDefault(require("../utils/getProductCost"));
var ProductController = /** @class */ (function () {
    function ProductController() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    ProductController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.default.find({}).populate('ingredients.material')];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, response.json(products)];
                }
            });
        });
    };
    ProductController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.params.name;
                        return [4 /*yield*/, Product_1.default.find({
                                name: { $regex: new RegExp(name), $options: 'i' },
                            }).populate('ingredients.material')];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, response.json(products)];
                }
            });
        });
    };
    ProductController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, price, description, ingredients, available, image, cost, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, price = _a.price, description = _a.description, ingredients = _a.ingredients, available = _a.available, image = _a.image;
                        return [4 /*yield*/, getProductCost_1.default(ingredients)];
                    case 1:
                        cost = _b.sent();
                        return [4 /*yield*/, Product_1.default.create({
                                name: name,
                                price: price,
                                cost: cost,
                                description: description,
                                ingredients: ingredients,
                                available: available,
                                image: image,
                            })];
                    case 2:
                        product = _b.sent();
                        return [4 /*yield*/, product.populate('ingredients.material').execPopulate()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    };
    ProductController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, price, ingredients, description, available, image, id, cost, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, price = _a.price, ingredients = _a.ingredients, description = _a.description, available = _a.available, image = _a.image;
                        id = request.params.id;
                        return [4 /*yield*/, getProductCost_1.default(ingredients)];
                    case 1:
                        cost = _b.sent();
                        return [4 /*yield*/, Product_1.default.findOneAndUpdate({ _id: id }, {
                                name: name,
                                price: price,
                                description: description,
                                ingredients: ingredients,
                                cost: cost,
                                available: available,
                                image: image,
                            }, { new: true })];
                    case 2:
                        product = _b.sent();
                        if (!product)
                            return [2 /*return*/, response.status(400).json('product not found')];
                        return [4 /*yield*/, product.save()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, product.populate('ingredients.material').execPopulate()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    };
    ProductController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, Product_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                }
            });
        });
    };
    return ProductController;
}());
exports.default = new ProductController();
