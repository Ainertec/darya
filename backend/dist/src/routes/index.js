"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Products_routes_1 = require("./Products.routes");
var Clients_routes_1 = require("./Clients.routes");
var Ingredients_routes_1 = require("./Ingredients.routes");
var Deliverymans_routes_1 = require("./Deliverymans.routes");
var Districts_routes_1 = require("./Districts.routes");
var Orders_routes_1 = require("./Orders.routes");
// validations
var productSchema_1 = __importDefault(require("../validations/productSchema"));
var ingredientSchema_1 = __importDefault(require("../validations/ingredientSchema"));
var deliverymanSchema_1 = __importDefault(require("../validations/deliverymanSchema"));
var reportSchema_1 = __importDefault(require("../validations/reportSchema"));
var printerSchema_1 = __importDefault(require("../validations/printerSchema"));
var districtSchema_1 = __importDefault(require("../validations/districtSchema"));
var serialSchema_1 = __importDefault(require("../validations/serialSchema"));
var orderSchema_1 = require("../validations/orderSchema");
var clientSchema_1 = require("../validations/clientSchema");
var commonSchema_1 = require("../validations/commonSchema");
var Reports_routes_1 = require("./Reports.routes");
var Printers_routes_1 = require("./Printers.routes");
var SerialController_1 = __importDefault(require("../app/controllers/SerialController"));
var celebrate_1 = require("celebrate");
var routes = express_1.Router();
// products
var productRouters = new Products_routes_1.ProductRoutes(routes);
productRouters.getRoutes({ product: productSchema_1.default, paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId });
// clients
var clientRoutes = new Clients_routes_1.ClientsRoutes(routes);
clientRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, client: clientSchema_1.client, clientUpdate: clientSchema_1.clientUpdate });
// ingredients
var ingredientRoutes = new Ingredients_routes_1.IngredientsRoutes(routes);
ingredientRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, ingredient: ingredientSchema_1.default });
// deliverymans
var deliverymanRoutes = new Deliverymans_routes_1.DeliverymansRoutes(routes);
deliverymanRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, deliveryman: deliverymanSchema_1.default });
// districtsRoutes
var districtRoutes = new Districts_routes_1.DistrictsRoutes(routes);
districtRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, district: districtSchema_1.default });
// orders
var orderRoutes = new Orders_routes_1.OrdersRoutes(routes);
orderRoutes.getRoutes({
    order: orderSchema_1.order,
    orderUpdate: orderSchema_1.orderUpdate,
    paramDeliveryman: orderSchema_1.paramDeliveryman,
    paramIdentification: orderSchema_1.paramIdentification,
    paramId: commonSchema_1.paramId,
});
// reports
var reportRoutes = new Reports_routes_1.ReportsRoutes(routes);
reportRoutes.getRoutes(reportSchema_1.default);
// printers
var printersRoutes = new Printers_routes_1.PrintersRoutes(routes);
printersRoutes.getRoutes({ printer: printerSchema_1.default });
// serial
routes.get('/serial_false', celebrate_1.celebrate({ query: serialSchema_1.default }), SerialController_1.default.exit);
exports.default = routes;