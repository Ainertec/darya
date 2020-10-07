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
exports.Questions = void 0;
/* eslint-disable camelcase */
/* eslint-disable func-names */
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.Questions = Object.freeze({
    first: 'Qual o modelo do seu primeiro carro?',
    second: 'Qual o nome do seu melhor amigo de infância?',
    third: 'Qual o nome do seu primeiro animal de estimação?',
    fourth: 'Qual o nome da sua mãe?',
    fifth: 'Qual sua cor preferida?',
    getQuestions: function () {
        var ques = [this.first, this.second, this.third, this.fourth, this.fifth];
        return ques;
    },
});
var AddressSchema = new mongoose_1.Schema({
    district: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'District',
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
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
    },
    question: {
        type: String,
        enum: Object.values(exports.Questions),
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    address: [AddressSchema],
    admin: {
        type: Boolean,
        default: null,
    },
    phone: [
        {
            type: String,
            required: true,
        },
    ],
}, {
    timestamps: true,
});
Object.assign(UserSchema.statics, {
    Questions: exports.Questions,
});
UserSchema.virtual('password', { type: String, require: true });
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.password) return [3 /*break*/, 2];
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, 8)];
                case 1:
                    hash = _a.sent();
                    this.password_hash = hash;
                    _a.label = 2;
                case 2:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
UserSchema.methods.checkPassword = function (password) {
    return bcrypt_1.default.compare(password, this.password_hash);
};
UserSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, String(process.env.APP_SECRET));
};
exports.default = mongoose_1.model('User', UserSchema);
