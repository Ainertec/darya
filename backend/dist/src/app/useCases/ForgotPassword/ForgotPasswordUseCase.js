"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordUseCase = void 0;
const User_1 = __importDefault(require("../../models/User"));
class ForgotPasswordUseCase {
    async getClientQuestion(username) {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            throw new Error('user does not exist');
        }
        return { question: user.question };
    }
    async reset(username, response, newPassword) {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            throw new Error('That user does not exist');
        }
        if (response !== user.response) {
            throw new Error('The response is wrong');
        }
        user.password = newPassword;
        await user.save();
        return user;
    }
}
exports.ForgotPasswordUseCase = ForgotPasswordUseCase;
