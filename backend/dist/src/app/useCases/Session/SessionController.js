"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
class SessionController {
    constructor(sessionUseCase) {
        this.sessionUseCase = sessionUseCase;
    }
    async store(request, response) {
        const { username, password } = request.body;
        try {
            const res = await this.sessionUseCase.createSession(username, password);
            return response.json(res);
        }
        catch (error) {
            return response.status(401).json(error.message);
        }
    }
}
exports.SessionController = SessionController;
