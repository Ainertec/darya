"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordRoutes = void 0;
const ForgotPassword_1 = require("../app/useCases/ForgotPassword");
class ForgotPasswordRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes() {
        this.routes.get('/forgot/:username', (request, response) => {
            return ForgotPassword_1.forgotPasswordController.show(request, response);
        });
        this.routes.post('/forgot', (request, response) => {
            return ForgotPassword_1.forgotPasswordController.store(request, response);
        });
    }
}
exports.ForgotPasswordRoutes = ForgotPasswordRoutes;
