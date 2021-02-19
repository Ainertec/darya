"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deliveryman = void 0;
const mongoose_1 = require("mongoose");
const DeliverymanSchema = new mongoose_1.Schema({
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
exports.Deliveryman = mongoose_1.model('Deliveryman', DeliverymanSchema);
