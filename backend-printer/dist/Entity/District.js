"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.District = void 0;
const mongoose_1 = require("mongoose");
const DistrictSchema = new mongoose_1.Schema({
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
exports.District = mongoose_1.model('District', DistrictSchema);
