"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintersRoutes = void 0;
var celebrate_1 = require("celebrate");
var PrinterController_1 = __importDefault(require("../app/controllers/PrinterController"));
var PrintersRoutes = /** @class */ (function () {
    function PrintersRoutes(routes) {
        this.routes = routes;
    }
    PrintersRoutes.prototype.getRoutes = function (validations) {
        this.routes.post('/printers', celebrate_1.celebrate({ body: validations.printer }), PrinterController_1.default.store);
        this.routes.get('/printers/sold_report', PrinterController_1.default.soldPrint);
        this.routes.get('/printers/deliveryman_report/:deliveryman_id', PrinterController_1.default.deliverymanPrint);
    };
    return PrintersRoutes;
}());
exports.PrintersRoutes = PrintersRoutes;
