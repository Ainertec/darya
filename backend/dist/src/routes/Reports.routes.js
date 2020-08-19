"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsRoutes = void 0;
var celebrate_1 = require("celebrate");
var ReportController_1 = __importDefault(require("../app/controllers/ReportController"));
var ReportsRoutes = /** @class */ (function () {
    function ReportsRoutes(routes) {
        this.routes = routes;
    }
    ReportsRoutes.prototype.getRoutes = function (report) {
        this.routes.get('/reports/deliveryman/rate/:deliveryman_id', celebrate_1.celebrate({ params: report }), ReportController_1.default.deliverymanPayment);
        this.routes.get('/reports/orders/profit', ReportController_1.default.ordersProfit);
        this.routes.get('/reports/deliveryman/orders/:deliveryman_id', celebrate_1.celebrate({ params: report }), ReportController_1.default.allFinishedOrdersByDeliveryman);
        this.routes.get('/reports/products/dispense_gain', ReportController_1.default.productsDispenseAndGain);
        this.routes.get('/reports/products/amount', ReportController_1.default.productsAmount);
        this.routes.delete('/reports', ReportController_1.default.delete);
    };
    return ReportsRoutes;
}());
exports.ReportsRoutes = ReportsRoutes;
