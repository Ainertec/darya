"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverymansRoutes = void 0;
const celebrate_1 = require("celebrate");
const DeliverymanController_1 = __importDefault(require("../app/controllers/DeliverymanController"));
class DeliverymansRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/deliverymans', DeliverymanController_1.default.index);
        this.routes.get('/deliverymans/hasDelivery', DeliverymanController_1.default.showByDelivery);
        this.routes.get('/deliverymans/availables', DeliverymanController_1.default.show);
        this.routes.get('/deliverymans/working_days', DeliverymanController_1.default.showByWorking);
        this.routes.get('/deliverymans/:name', DeliverymanController_1.default.showByName);
        this.routes.post('/deliverymans', celebrate_1.celebrate({ body: validations.deliveryman }), DeliverymanController_1.default.store);
        this.routes.put('/deliverymans/:id', celebrate_1.celebrate({ body: validations.deliveryman, params: validations.paramId }), DeliverymanController_1.default.update);
        this.routes.put('/deliverymans', DeliverymanController_1.default.reset);
        this.routes.delete('/deliverymans/:id', celebrate_1.celebrate({ params: validations.paramId }), DeliverymanController_1.default.delete);
    }
}
exports.DeliverymansRoutes = DeliverymansRoutes;
