"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const deliveryman = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    working_day: celebrate_1.Joi.boolean(),
    available: celebrate_1.Joi.boolean(),
    hasDelivery: celebrate_1.Joi.boolean(),
    phone: celebrate_1.Joi.string().required(),
});
exports.default = deliveryman;
