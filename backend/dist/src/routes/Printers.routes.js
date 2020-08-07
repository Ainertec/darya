"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintersRoutes = void 0;
var PrinterController_1 = __importDefault(require("../app/controllers/PrinterController"));
var celebrate_1 = require("celebrate");
var PrintersRoutes = /** @class */ (function () {
    function PrintersRoutes(routes) {
        this.routes = routes;
    }
    PrintersRoutes.prototype.getRoutes = function (validations) {
        this.routes.post('/printers', celebrate_1.celebrate({ body: validations.printer }), PrinterController_1.default.store);
    };
    return PrintersRoutes;
}());
exports.PrintersRoutes = PrintersRoutes;
