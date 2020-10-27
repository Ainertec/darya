"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    async auth(request, response, next) {
        const authHeaders = request.headers.authorization;
        if (!authHeaders) {
            return response.status(401).json({ message: 'Token not provider' });
        }
        const [, token] = authHeaders.split(' ');
        try {
            const jwtPayload = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
            request.userId = jwtPayload.id;
            return next();
        }
        catch (error) {
            return response.status(401).json({ message: 'Token invalid' });
        }
    }
}
exports.default = new Authentication().auth;
