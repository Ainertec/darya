"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DistrictSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('District', DistrictSchema);
