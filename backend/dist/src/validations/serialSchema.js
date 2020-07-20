"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var serialSchema = {
    password: celebrate_1.Joi.string().required(),
};
exports.default = serialSchema;
