"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var ingredient = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    description: celebrate_1.Joi.string(),
    price: celebrate_1.Joi.number().required(),
    stock: celebrate_1.Joi.number().required(),
    unit: celebrate_1.Joi.string().required(),
});
exports.default = ingredient;
