"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var celebrate_1 = require("celebrate");
var UserController_1 = __importDefault(require("../app/controllers/UserController"));
var UserAuth_1 = __importDefault(require("../middlewares/UserAuth"));
var Authentication_1 = __importDefault(require("../middlewares/Authentication"));
var Authorization_1 = __importDefault(require("../middlewares/Authorization"));
var UserRoutes = /** @class */ (function () {
    function UserRoutes(routes) {
        this.routes = routes;
    }
    UserRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/users', Authentication_1.default, Authorization_1.default, UserController_1.default.index);
        this.routes.get('/users/:name', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ params: validations.paramName }), UserController_1.default.show);
        this.routes.post('/users', UserAuth_1.default, celebrate_1.celebrate({ body: validations.client }), UserController_1.default.store);
        this.routes.put('/users/:id', Authentication_1.default, celebrate_1.celebrate({
            body: validations.clientUpdate,
            params: validations.paramId,
        }), UserController_1.default.update);
        this.routes.delete('/users/:id', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ params: validations.paramId }), UserController_1.default.delete);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
