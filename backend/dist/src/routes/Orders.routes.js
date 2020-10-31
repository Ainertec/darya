"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const celebrate_1 = require("celebrate");
const OrderController_1 = __importDefault(require("../app/controllers/OrderController"));
const Authorization_1 = __importDefault(require("../middlewares/Authorization"));
class OrdersRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/orders', Authorization_1.default, OrderController_1.default.index);
        this.routes.get('/orders/user', OrderController_1.default.showByUser);
        this.routes.get('/orders/deliveryman/:deliveryman', Authorization_1.default, celebrate_1.celebrate({ params: validations.paramDeliveryman }), OrderController_1.default.showByDeliveryman);
        this.routes.get('/orders/:identification', Authorization_1.default, celebrate_1.celebrate({ params: validations.paramIdentification }), OrderController_1.default.show);
        this.routes.post('/orders', celebrate_1.celebrate({ body: validations.order }), OrderController_1.default.store);
        this.routes.put('/orders/:id', Authorization_1.default, celebrate_1.celebrate({ body: validations.orderUpdate }), OrderController_1.default.update);
        this.routes.delete('/orders/:id', Authorization_1.default, celebrate_1.celebrate({ params: validations.paramId }), OrderController_1.default.delete);
    }
}
exports.OrdersRoutes = OrdersRoutes;
