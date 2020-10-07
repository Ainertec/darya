"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientUpdate = exports.client = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
var address = celebrate_1.Joi.object().keys({
    district: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
    street: celebrate_1.Joi.string().required(),
    reference: celebrate_1.Joi.string(),
    number: celebrate_1.Joi.number(),
});
exports.client = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    address: celebrate_1.Joi.array().items(address),
    phone: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
    username: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
    question: celebrate_1.Joi.string().required(),
    response: celebrate_1.Joi.string().required(),
    admin: celebrate_1.Joi.boolean(),
});
exports.clientUpdate = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string(),
    address: celebrate_1.Joi.array().items(address),
    phone: celebrate_1.Joi.array().items(celebrate_1.Joi.string()),
    username: celebrate_1.Joi.string(),
    password: celebrate_1.Joi.string(),
    question: celebrate_1.Joi.string(),
    response: celebrate_1.Joi.string(),
    admin: celebrate_1.Joi.boolean(),
});
exports.default = exports.client;
