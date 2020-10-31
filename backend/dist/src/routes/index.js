"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Products_routes_1 = require("./Products.routes");
const Users_routes_1 = require("./Users.routes");
const Ingredients_routes_1 = require("./Ingredients.routes");
const Deliverymans_routes_1 = require("./Deliverymans.routes");
const Districts_routes_1 = require("./Districts.routes");
const Orders_routes_1 = require("./Orders.routes");
// validations
const productSchema_1 = __importDefault(require("../validations/productSchema"));
const ingredientSchema_1 = __importDefault(require("../validations/ingredientSchema"));
const deliverymanSchema_1 = __importDefault(require("../validations/deliverymanSchema"));
const reportSchema_1 = __importDefault(require("../validations/reportSchema"));
const printerSchema_1 = __importDefault(require("../validations/printerSchema"));
const districtSchema_1 = __importDefault(require("../validations/districtSchema"));
const serialSchema_1 = __importDefault(require("../validations/serialSchema"));
const orderSchema_1 = require("../validations/orderSchema");
const clientSchema_1 = require("../validations/clientSchema");
const commonSchema_1 = require("../validations/commonSchema");
const Reports_routes_1 = require("./Reports.routes");
const Printers_routes_1 = require("./Printers.routes");
const SerialController_1 = __importDefault(require("../app/controllers/SerialController"));
const Session_routes_1 = require("./Session.routes");
const ForgotPassword_routes_1 = require("./ForgotPassword.routes");
const Authentication_1 = __importDefault(require("../middlewares/Authentication"));
const Authorization_1 = __importDefault(require("../middlewares/Authorization"));
const ShopController_1 = require("../app/controllers/ShopController");
const routes = express_1.Router();
const shopController = new ShopController_1.ShopController();
routes.post('/shop', Authentication_1.default, shopController.store);
routes.get('/shop', shopController.index);
// session
const sessionRoutes = new Session_routes_1.SessionRoutes(routes);
sessionRoutes.getRoutes();
// forgot
const forgotPasswordRoutes = new ForgotPassword_routes_1.ForgotPasswordRoutes(routes);
forgotPasswordRoutes.getRoutes();
// users
const userRoutes = new Users_routes_1.UserRoutes(routes);
userRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, client: clientSchema_1.client, clientUpdate: clientSchema_1.clientUpdate });
// products
const productRouters = new Products_routes_1.ProductRoutes(routes);
productRouters.getRoutes({ product: productSchema_1.default, paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId });
// districtsRoutes
const districtRoutes = new Districts_routes_1.DistrictsRoutes(routes);
districtRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, district: districtSchema_1.default });
routes.use(Authentication_1.default);
// orders
const orderRoutes = new Orders_routes_1.OrdersRoutes(routes);
orderRoutes.getRoutes({
    order: orderSchema_1.order,
    orderUpdate: orderSchema_1.orderUpdate,
    paramDeliveryman: orderSchema_1.paramDeliveryman,
    paramIdentification: orderSchema_1.paramIdentification,
    paramId: commonSchema_1.paramId,
});
routes.use(Authorization_1.default);
// deliverymans
const deliverymanRoutes = new Deliverymans_routes_1.DeliverymansRoutes(routes);
deliverymanRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, deliveryman: deliverymanSchema_1.default });
// ingredients
const ingredientRoutes = new Ingredients_routes_1.IngredientsRoutes(routes);
ingredientRoutes.getRoutes({ paramName: commonSchema_1.paramName, paramId: commonSchema_1.paramId, ingredient: ingredientSchema_1.default });
// reports
const reportRoutes = new Reports_routes_1.ReportsRoutes(routes);
reportRoutes.getRoutes(reportSchema_1.default);
// printers
const printersRoutes = new Printers_routes_1.PrintersRoutes(routes);
printersRoutes.getRoutes({ printer: printerSchema_1.default });
// serial
routes.get('/serial_false', celebrate_1.celebrate({ query: serialSchema_1.default }), SerialController_1.default.exit);
exports.default = routes;
