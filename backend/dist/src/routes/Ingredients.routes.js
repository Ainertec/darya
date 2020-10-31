"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsRoutes = void 0;
const celebrate_1 = require("celebrate");
const IngredientController_1 = __importDefault(require("../app/controllers/IngredientController"));
class IngredientsRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/ingredients', IngredientController_1.default.index);
        this.routes.get('/ingredients/:name', celebrate_1.celebrate({ params: validations.paramName }), IngredientController_1.default.show);
        this.routes.post('/ingredients', celebrate_1.celebrate({ body: validations.ingredient }), IngredientController_1.default.store);
        this.routes.put('/ingredients/:id', celebrate_1.celebrate({ body: validations.ingredient, params: validations.paramId }), IngredientController_1.default.update);
        this.routes.delete('/ingredients/:id', celebrate_1.celebrate({ params: validations.paramId }), IngredientController_1.default.delete);
    }
}
exports.IngredientsRoutes = IngredientsRoutes;
