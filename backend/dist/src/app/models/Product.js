"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var IngredientSchema = new mongoose_1.Schema({
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
var ProductSchema = new mongoose_1.Schema({
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
    available: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        required: true,
    },
    ingredients: [IngredientSchema],
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Product', ProductSchema);
