"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../app/models/User"));
class Authentication {
    async auth(request, response, next) {
        const userId = request.userId;
        const user = await User_1.default.findOne({ _id: userId });
        if (!(user === null || user === void 0 ? void 0 : user.admin)) {
            return response.status(401).json('Restrict area');
        }
        next();
    }
}
exports.default = new Authentication().auth;
