"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordController = void 0;
class ForgotPasswordController {
    constructor(forgotPasswordUseCase) {
        this.forgotPasswordUseCase = forgotPasswordUseCase;
    }
    async show(request, response) {
        const { username } = request.params;
        try {
            const clientQuestion = await this.forgotPasswordUseCase.getClientQuestion(username);
            return response.json(clientQuestion);
        }
        catch (error) {
            return response.status(400).json(error.message);
        }
    }
    async store(request, responseHttp) {
        const { username, response, password } = request.body;
        try {
            const clientUpdated = await this.forgotPasswordUseCase.reset(username, response, password);
            return responseHttp.json(clientUpdated);
        }
        catch (error) {
            return responseHttp.status(400).json(error.message);
        }
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
