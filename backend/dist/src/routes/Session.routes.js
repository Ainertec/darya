"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRoutes = void 0;
const Session_1 = require("../app/useCases/Session");
class SessionRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes() {
        this.routes.post('/sessions', (request, response) => {
            return Session_1.sessionController.store(request, response);
        });
    }
}
exports.SessionRoutes = SessionRoutes;
