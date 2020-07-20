"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var ProductController_1 = __importDefault(require("./app/controllers/ProductController"));
var DeliverymanController_1 = __importDefault(require("./app/controllers/DeliverymanController"));
var DistrictController_1 = __importDefault(require("./app/controllers/DistrictController"));
var ClientController_1 = __importDefault(require("./app/controllers/ClientController"));
var OrderController_1 = __importDefault(require("./app/controllers/OrderController"));
var ReportController_1 = __importDefault(require("./app/controllers/ReportController"));
var PrinterController_1 = __importDefault(require("./app/controllers/PrinterController"));
var SerialController_1 = __importDefault(require("./app/controllers/SerialController"));
// validations
var productSchema_1 = __importDefault(require("./validations/productSchema"));
var deliverymanSchema_1 = __importDefault(require("./validations/deliverymanSchema"));
var districtSchema_1 = __importDefault(require("./validations/districtSchema"));
var clientSchema_1 = __importDefault(require("./validations/clientSchema"));
var reportSchema_1 = __importDefault(require("./validations/reportSchema"));
var serialSchema_1 = __importDefault(require("./validations/serialSchema"));
var printerSchema_1 = __importDefault(require("./validations/printerSchema"));
var orderSchema_1 = require("./validations/orderSchema");
var commonSchema_1 = require("./validations/commonSchema");
var routes = express_1.default.Router();
// Products
routes.get('/products', ProductController_1.default.index);
routes.get('/products/:name', celebrate_1.celebrate({ params: commonSchema_1.paramName }), ProductController_1.default.show);
routes.post('/products', celebrate_1.celebrate({ body: productSchema_1.default }), ProductController_1.default.store);
routes.put('/products/:id', celebrate_1.celebrate({ body: productSchema_1.default, params: commonSchema_1.paramId }), ProductController_1.default.update);
routes.delete('/products/:id', celebrate_1.celebrate({ params: commonSchema_1.paramId }), ProductController_1.default.delete);
// Deliverymans
routes.get('/deliverymans', DeliverymanController_1.default.index);
routes.get('/deliverymans/hasDelivery', DeliverymanController_1.default.showByDelivery);
routes.get('/deliverymans/availables', DeliverymanController_1.default.show);
routes.get('/deliverymans/working_days', DeliverymanController_1.default.showByWorking);
routes.get('/deliverymans/:name', DeliverymanController_1.default.showByName);
routes.post('/deliverymans', celebrate_1.celebrate({ body: deliverymanSchema_1.default }), DeliverymanController_1.default.store);
routes.put('/deliverymans/:id', celebrate_1.celebrate({ body: deliverymanSchema_1.default, params: commonSchema_1.paramId }), DeliverymanController_1.default.update);
routes.put('/deliverymans', DeliverymanController_1.default.reset);
routes.delete('/deliverymans/:id', celebrate_1.celebrate({ params: commonSchema_1.paramId }), DeliverymanController_1.default.delete);
// District
routes.get('/districts', DistrictController_1.default.index);
routes.get('/districts/:name', celebrate_1.celebrate({ params: commonSchema_1.paramName }), DistrictController_1.default.show);
routes.post('/districts', celebrate_1.celebrate({ body: districtSchema_1.default }), DistrictController_1.default.store);
routes.put('/districts/:id', celebrate_1.celebrate({ body: districtSchema_1.default, params: commonSchema_1.paramId }), DistrictController_1.default.update);
routes.delete('/districts/:id', celebrate_1.celebrate({ params: commonSchema_1.paramId }), DistrictController_1.default.delete);
// Client
routes.get('/clients', ClientController_1.default.index);
routes.get('/clients/:name', celebrate_1.celebrate({ params: commonSchema_1.paramName }), ClientController_1.default.show);
routes.post('/clients', celebrate_1.celebrate({ body: clientSchema_1.default }), ClientController_1.default.store);
routes.put('/clients/:id', celebrate_1.celebrate({ body: clientSchema_1.default, params: commonSchema_1.paramId }), ClientController_1.default.update);
routes.delete('/clients/:id', celebrate_1.celebrate({ params: commonSchema_1.paramId }), ClientController_1.default.delete);
// Order
routes.get('/orders', OrderController_1.default.index);
routes.get('/orders/deliveryman/:deliveryman', celebrate_1.celebrate({ params: orderSchema_1.paramDeliveryman }), OrderController_1.default.showByDeliveryman);
routes.get('/orders/:identification', celebrate_1.celebrate({ params: orderSchema_1.paramIdentification }), OrderController_1.default.show);
routes.post('/orders', celebrate_1.celebrate({ body: orderSchema_1.order }), OrderController_1.default.store);
routes.put('/orders/:id', celebrate_1.celebrate({ body: orderSchema_1.orderUpdate }), OrderController_1.default.update);
routes.delete('/orders/:id', celebrate_1.celebrate({ params: commonSchema_1.paramId }), OrderController_1.default.delete);
// Reports
routes.get('/reports/deliveryman/rate/:deliveryman_id', celebrate_1.celebrate({ params: reportSchema_1.default }), ReportController_1.default.deliverymanPayment);
routes.get('/reports/orders/profit', ReportController_1.default.ordersProfit);
routes.get('/reports/products/dispense_gain', ReportController_1.default.productsDispenseAndGain);
routes.get('/reports/products/amount', ReportController_1.default.productsAmount);
routes.delete('/reports', ReportController_1.default.delete);
// Printer
routes.post('/printers', celebrate_1.celebrate({ body: printerSchema_1.default }), PrinterController_1.default.store);
// Serial
routes.get('/serial_false', celebrate_1.celebrate({ query: serialSchema_1.default }), SerialController_1.default.exit);
exports.default = routes;
