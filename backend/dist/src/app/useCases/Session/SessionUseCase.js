"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionUseCase = void 0;
// import { IClientRepository } from '../../Repositories/IClientRepository';
const User_1 = __importDefault(require("../../models/User"));
class SessionUseCase {
    // constructor(private repository: IClientRepository) {}
    async createSession(username, password) {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            throw new Error('user does not exist');
        }
        const correctPassword = await user.checkPassword(password);
        if (!correctPassword) {
            throw new Error('incorrect password');
        }
        const token = await user.generateToken();
        await user.populate('address.district').execPopulate();
        const serializedUser = Object.assign(Object.assign({}, user.toObject()), { password_hash: undefined, response: undefined });
        return {
            user: serializedUser,
            token,
        };
    }
}
exports.SessionUseCase = SessionUseCase;
