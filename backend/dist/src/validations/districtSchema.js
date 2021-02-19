"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const district = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    city: celebrate_1.Joi.string().required(),
    rate: celebrate_1.Joi.number().required(),
});
exports.default = district;
