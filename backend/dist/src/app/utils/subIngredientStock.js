"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subIngredientStock = void 0;
const Ingredient_1 = __importDefault(require("../models/Ingredient"));
async function subIngredientStock(ingredients, itemQuantity) {
    await Promise.all(ingredients.map(async (itemIngredient) => {
        const ingredientPersisted = await Ingredient_1.default.findOne({
            _id: itemIngredient.material,
        });
        if (ingredientPersisted) {
            ingredientPersisted.stock -= itemIngredient.quantity * itemQuantity;
            await ingredientPersisted.save();
        }
    }));
}
exports.subIngredientStock = subIngredientStock;
