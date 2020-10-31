"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingredient_1 = __importStar(require("../models/Ingredient"));
class IngredientController {
    async index(request, response) {
        const ingredients = await Ingredient_1.default.find({});
        return response.json(ingredients);
    }
    async show(request, response) {
        const { name } = request.params;
        const ingredients = await Ingredient_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
        return response.json(ingredients);
    }
    async store(request, response) {
        const { name, description, price, stock, unit } = request.body;
        const validUnit = Ingredient_1.Unit.getUnit().includes(unit);
        if (!validUnit) {
            return response.status(400).json('Invalide unit');
        }
        const priceUnit = price / stock;
        const ingredient = await Ingredient_1.default.create({
            name,
            description,
            price,
            priceUnit,
            stock,
            unit,
        });
        return response.json(ingredient);
    }
    async update(request, response) {
        const { name, description, price, stock, unit } = request.body;
        const { id } = request.params;
        const priceUnit = price / stock;
        const validUnit = Ingredient_1.Unit.getUnit().includes(unit);
        if (!validUnit) {
            return response.status(400).json('Invalide unit');
        }
        const ingredient = await Ingredient_1.default.findOneAndUpdate({ _id: id }, {
            name,
            description,
            price,
            priceUnit,
            stock,
            unit,
        }, { new: true });
        return response.json(ingredient);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Ingredient_1.default.findOneAndRemove({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new IngredientController();
