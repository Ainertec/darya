"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsRoutes = void 0;
var celebrate_1 = require("celebrate");
var IngredientController_1 = __importDefault(require("../app/controllers/IngredientController"));
var IngredientsRoutes = /** @class */ (function () {
    function IngredientsRoutes(routes) {
        this.routes = routes;
    }
    IngredientsRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/ingredients', IngredientController_1.default.index);
        this.routes.get('/ingredients/:name', celebrate_1.celebrate({ params: validations.paramName }), IngredientController_1.default.show);
        this.routes.post('/ingredients', celebrate_1.celebrate({ body: validations.ingredient }), IngredientController_1.default.store);
        this.routes.put('/ingredients/:id', celebrate_1.celebrate({ body: validations.ingredient, params: validations.paramId }), IngredientController_1.default.update);
        this.routes.delete('/ingredients/:id', celebrate_1.celebrate({ params: validations.paramId }), IngredientController_1.default.delete);
    };
    return IngredientsRoutes;
}());
exports.IngredientsRoutes = IngredientsRoutes;
