"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose_1 = require("mongoose");
const Product_1 = __importDefault(require("./Product"));
const subIngredientStock_1 = require("../utils/subIngredientStock");
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
    site: 'site',
    getSource() {
        const source = [
            this.ifood,
            this.whatsapp,
            this.instagram,
            this.delivery,
            this.itau,
            this.bradesco,
            this.site
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
    viewed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
Object.assign(OrderSchema.statics, {
    Source,
});
OrderSchema.post('save', async (document) => {
    if (document && document.finished) {
        for (const item of document.items) {
            const product = await Product_1.default.findOne({ _id: item.product });
            if (product) {
                await subIngredientStock_1.subIngredientStock(product.ingredients, item.quantity);
            }
        }
    }
});
exports.default = mongoose_1.model('Order', OrderSchema);
