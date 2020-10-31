"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingredient_1 = __importDefault(require("../models/Ingredient"));
async function getCost(ingredients) {
    let cost = 0;
    await Promise.all(ingredients.map(async (itemIngredient) => {
        const ingredient = await Ingredient_1.default.findOne({
            _id: itemIngredient.material,
        });
        if (ingredient) {
            cost += ingredient.priceUnit * itemIngredient.quantity;
        }
    }));
    return cost;
}
exports.default = getCost;
