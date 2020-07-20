"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
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
    stock: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Product', ProductSchema);
