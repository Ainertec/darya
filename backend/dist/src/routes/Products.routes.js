"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const celebrate_1 = require("celebrate");
const ProductController_1 = __importDefault(require("../app/controllers/ProductController"));
const Authorization_1 = __importDefault(require("../middlewares/Authorization"));
const Authentication_1 = __importDefault(require("../middlewares/Authentication"));
class ProductRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/products', ProductController_1.default.index);
        this.routes.get('/products/:name', celebrate_1.celebrate({ params: validations.paramName }), ProductController_1.default.show);
        this.routes.post('/products', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ body: validations.product }), ProductController_1.default.store);
        this.routes.put('/products/:id', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ body: validations.product, params: validations.paramId }), ProductController_1.default.update);
        this.routes.delete('/products/:id', Authentication_1.default, Authorization_1.default, celebrate_1.celebrate({ params: validations.paramId }), ProductController_1.default.delete);
    }
}
exports.ProductRoutes = ProductRoutes;
