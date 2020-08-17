"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsRoutes = void 0;
var celebrate_1 = require("celebrate");
var ClientController_1 = __importDefault(require("../app/controllers/ClientController"));
var ClientsRoutes = /** @class */ (function () {
    function ClientsRoutes(routes) {
        this.routes = routes;
    }
    ClientsRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/clients', ClientController_1.default.index);
        this.routes.get('/clients/:name', celebrate_1.celebrate({ params: validations.paramName }), ClientController_1.default.show);
        this.routes.post('/clients', celebrate_1.celebrate({ body: validations.client }), ClientController_1.default.store);
        this.routes.put('/clients/:id', celebrate_1.celebrate({
            body: validations.clientUpdate,
            params: validations.paramId,
        }), ClientController_1.default.update);
        this.routes.delete('/clients/:id', celebrate_1.celebrate({ params: validations.paramId }), ClientController_1.default.delete);
    };
    return ClientsRoutes;
}());
exports.ClientsRoutes = ClientsRoutes;
