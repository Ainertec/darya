"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const serialSchema = {
    password: celebrate_1.Joi.string().required(),
};
exports.default = serialSchema;
