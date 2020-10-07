"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRoutes = void 0;
var Session_1 = require("../app/useCases/Session");
var SessionRoutes = /** @class */ (function () {
    function SessionRoutes(routes) {
        this.routes = routes;
    }
    SessionRoutes.prototype.getRoutes = function () {
        this.routes.post('/sessions', function (request, response) {
            return Session_1.sessionController.store(request, response);
        });
    };
    return SessionRoutes;
}());
exports.SessionRoutes = SessionRoutes;
