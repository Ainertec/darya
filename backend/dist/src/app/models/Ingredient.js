"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
/* eslint-disable no-param-reassign */
const mongoose_1 = require("mongoose");
const Product_1 = __importDefault(require("./Product"));
const getProductCost_1 = __importDefault(require("../utils/getProductCost"));
const Unit = Object.freeze({
    kilogram: 'g',
    liter: 'ml',
    unity: 'unidade',
    getUnit() {
        const unit = [this.kilogram, this.liter, this.unity];
        return unit;
    },
});
exports.Unit = Unit;
const IngredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    priceUnit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    unit: {
        type: String,
        required: true,
        enum: Object.values(Unit),
    },
    stock: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
Object.assign(IngredientSchema.statics, {
    Unit,
});
IngredientSchema.post('findOneAndUpdate', async (document) => {
    if (document) {
        const ingredientID = document._id;
        const products = await Product_1.default.find({
            'ingredients.material': { $in: ingredientID },
        });
        await Promise.all(products.map(async (product) => {
            const cost = await getProductCost_1.default(product.ingredients);
            product.cost = cost;
            await product.save();
        }));
    }
});
IngredientSchema.post('findOneAndRemove', async (document) => {
    if (document) {
        const ingredientID = document._id;
        const products = await Product_1.default.find({
            'ingredients.material': { $in: ingredientID },
        });
        await Promise.all(products.map(async (product) => {
            const ingredientUpdated = product.ingredients.filter(ingredient => String(ingredient.material) !== String(ingredientID));
            product.ingredients = ingredientUpdated;
            await product.save();
        }));
    }
});
exports.default = mongoose_1.model('Ingredient', IngredientSchema);
