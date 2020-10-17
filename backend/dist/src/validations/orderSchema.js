"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramDeliveryman = exports.paramIdentification = exports.orderUpdate = exports.order = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
var items = celebrate_1.Joi.object().keys({
    product: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
    quantity: celebrate_1.Joi.number().required(),
});
exports.order = celebrate_1.Joi.object().keys({
    user_id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
    deliveryman: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id'),
    user_address_id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id'),
    items: celebrate_1.Joi.array().items(items).required(),
    source: celebrate_1.Joi.string().required(),
    note: celebrate_1.Joi.string(),
    payment: celebrate_1.Joi.string(),
    viewed: celebrate_1.Joi.boolean(),
});
exports.orderUpdate = celebrate_1.Joi.object().keys({
    user_id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id'),
    deliveryman: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id'),
    user_address_id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id'),
    items: celebrate_1.Joi.array().items(items),
    source: celebrate_1.Joi.string(),
    note: celebrate_1.Joi.string(),
    payment: celebrate_1.Joi.string(),
    identification: celebrate_1.Joi.string(),
    finished: celebrate_1.Joi.boolean(),
    viewed: celebrate_1.Joi.boolean(),
});
exports.paramIdentification = {
    identification: celebrate_1.Joi.string().required(),
};
exports.paramDeliveryman = {
    deliveryman: celebrate_1.Joi.string().required(),
};
