"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
var mongoose_1 = require("mongoose");
var ItemsSchema = new mongoose_1.Schema({
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
var ClientSchema = new mongoose_1.Schema({
    client_id: {
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
var AddressSchema = new mongoose_1.Schema({
    client_address_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    district_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    district_name: {
        type: String,
        required: true,
    },
    district_rate: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
    },
    reference: {
        type: String,
    },
});
var Source = Object.freeze({
    ifood: 'Ifood',
    whatsapp: 'Whatsapp',
    instagram: 'Instagram',
    delivery: 'Pronta Entrega',
    getSource: function () {
        var source = [this.ifood, this.whatsapp, this.instagram, this.delivery];
        return source;
    },
});
exports.Source = Source;
var OrderSchema = new mongoose_1.Schema({
    client: ClientSchema,
    address: AddressSchema,
    deliveryman: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Deliveryman',
        required: true,
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
    Source: Source,
});
exports.default = mongoose_1.model('Order', OrderSchema);
