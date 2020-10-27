"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const IngredientSchema = new mongoose_1.Schema({
    material: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    cost: {
        type: Number,
        required: true,
    },
    ingredients: [IngredientSchema],
}, {
    timestamps: true,
});
exports.Product = mongoose_1.model('Product', ProductSchema);
