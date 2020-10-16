"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
var celebrate_1 = require("celebrate");
var OrderController_1 = __importDefault(require("../app/controllers/OrderController"));
var Authorization_1 = __importDefault(require("../middlewares/Authorization"));
var OrdersRoutes = /** @class */ (function () {
    function OrdersRoutes(routes) {
        this.routes = routes;
    }
    OrdersRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/orders', Authorization_1.default, OrderController_1.default.index);
        this.routes.get('/orders/user', OrderController_1.default.showByUser);
        this.routes.get('/orders/deliveryman/:deliveryman', Authorization_1.default, celebrate_1.celebrate({ params: validations.paramDeliveryman }), OrderController_1.default.showByDeliveryman);
        this.routes.get('/orders/:identification', Authorization_1.default, celebrate_1.celebrate({ params: validations.paramIdentification }), OrderController_1.default.show);
        this.routes.post('/orders', celebrate_1.celebrate({ body: validations.order }), OrderController_1.default.store);
        this.routes.put('/orders/:id', Authorization_1.default, celebrate_1.celebrate({ body: validations.orderUpdate }), OrderController_1.default.update);
        this.routes.delete('/orders/:id', Authorization_1.default, celebrate_1.celebrate({ params: validations.paramId }), OrderController_1.default.delete);
    };
    return OrdersRoutes;
}());
exports.OrdersRoutes = OrdersRoutes;
