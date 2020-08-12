"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DeliverymanSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    working_day: {
        type: Boolean,
        // required: true,
        default: false,
    },
    available: {
        type: Boolean,
        // required: true,
        default: false,
    },
    hasDelivery: {
        type: Boolean,
        // required: true,
        default: false,
    },
    phone: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Deliveryman', DeliverymanSchema);
