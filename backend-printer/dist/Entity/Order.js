"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Source = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose_1 = require("mongoose");
const ItemsSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const UserSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    phone: [
        {
            type: String,
            default: null,
        },
    ],
});
const AddressSchema = new mongoose_1.Schema({
    user_address_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
    district_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
    district_name: {
        type: String,
        default: null,
    },
    district_rate: {
        type: Number,
        default: null,
    },
    street: {
        type: String,
        default: null,
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
const Source = Object.freeze({
    ifood: 'Ifood',
    whatsapp: 'Whatsapp',
    instagram: 'Instagram',
    delivery: 'Pronta Entrega',
    itau: 'Transferência Itaú',
    bradesco: 'Transferência Bradesco',
    getSource() {
        const source = [
            this.ifood,
            this.whatsapp,
            this.instagram,
            this.delivery,
            this.itau,
            this.bradesco,
        ];
        return source;
    },
});
exports.Source = Source;
const OrderSchema = new mongoose_1.Schema({
    user: UserSchema,
    address: AddressSchema,
    deliveryman: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Deliveryman',
        default: null,
    },
    items: [ItemsSchema],
    total: {
        type: Number,
        default: null,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    source: {
        type: String,
        required: true,
        enum: Object.values(Source),
    },
    note: {
        type: String,
        default: null,
    },
    payment: {
        type: String,
        default: null,
    },
    identification: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
Object.assign(OrderSchema.statics, {
    Source,
});
exports.Order = mongoose_1.model('Order', OrderSchema);
