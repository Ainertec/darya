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
exports.Source = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
var mongoose_1 = require("mongoose");
var Product_1 = __importDefault(require("./Product"));
var subIngredientStock_1 = require("../utils/subIngredientStock");
var ItemsSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
var UserSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    phone: [
        {
            type: String,
            default: null,
        },
    ],
});
var AddressSchema = new mongoose_1.Schema({
    user_address_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
    district_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
    district_name: {
        type: String,
        default: null,
    },
    district_rate: {
        type: Number,
        default: null,
    },
    street: {
        type: String,
        default: null,
    },
    number: {
        type: Number,
        default: null,
    },
    reference: {
        type: String,
        default: null,
    },
});
var Source = Object.freeze({
    ifood: 'Ifood',
    whatsapp: 'Whatsapp',
    instagram: 'Instagram',
    delivery: 'Pronta Entrega',
    itau: 'Transferência Itaú',
    bradesco: 'Transferência Bradesco',
    site: 'site',
    getSource: function () {
        var source = [
            this.ifood,
            this.whatsapp,
            this.instagram,
            this.delivery,
            this.itau,
            this.bradesco,
            this.site
        ];
        return source;
    },
});
exports.Source = Source;
var OrderSchema = new mongoose_1.Schema({
    user: UserSchema,
    address: AddressSchema,
    deliveryman: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Deliveryman',
        default: null,
    },
    items: [ItemsSchema],
    total: {
        type: Number,
        default: null,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    source: {
        type: String,
        required: true,
        enum: Object.values(Source),
    },
    note: {
        type: String,
        default: null,
    },
    payment: {
        type: String,
        default: null,
    },
    identification: {
        type: String,
        required: true,
    },
    viewed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
Object.assign(OrderSchema.statics, {
    Source: Source,
});
OrderSchema.post('save', function (document) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, item, product;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(document && document.finished)) return [3 /*break*/, 5];
                _i = 0, _a = document.items;
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                item = _a[_i];
                return [4 /*yield*/, Product_1.default.findOne({ _id: item.product })];
            case 2:
                product = _b.sent();
                if (!product) return [3 /*break*/, 4];
                return [4 /*yield*/, subIngredientStock_1.subIngredientStock(product.ingredients, item.quantity)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = mongoose_1.model('Order', OrderSchema);
