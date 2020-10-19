"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
var celebrate_1 = require("celebrate");
var ProductController_1 = __importDefault(require("../app/controllers/ProductController"));
var Authorization_1 = __importDefault(require("../middlewares/Authorization"));
var Authentication_1 = __importDefault(require("../middlewares/Authentication"));
var ProductRoutes = /** @class */ (function () {
    function ProductRoutes(routes) {
        this.routes = routes;
    }
    ProductRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/products', ProductController_1.default.index);
        this.routes.get('/products/:name', celebrate_1.celebrate({ params: validations.paramName }), ProductController_1.default.show);
        this.routes.post('/products', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ body: validations.product }), ProductController_1.default.store);
        this.routes.put('/products/:id', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ body: validations.product, params: validations.paramId }), ProductController_1.default.update);
        this.routes.delete('/products/:id', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ params: validations.paramId }), ProductController_1.default.delete);
    };
    return ProductRoutes;
}());
exports.ProductRoutes = ProductRoutes;
