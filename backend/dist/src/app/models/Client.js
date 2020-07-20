"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var AddressSchema = new mongoose_1.Schema({
    district: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'District',
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        default: null,
    },
    reference: {
        type: String,
        default: null,
    },
});
var ClientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address: [AddressSchema],
    phone: [
        {
            type: String,
            default: null,
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Client', ClientSchema);
