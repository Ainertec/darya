"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
var ingredients = celebrate_1.Joi.object().keys({
    material: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
    quantity: celebrate_1.Joi.number().required(),
});
var product = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    description: celebrate_1.Joi.string(),
    ingredients: celebrate_1.Joi.array().items(ingredients).required(),
    price: celebrate_1.Joi.number().required(),
    cost: celebrate_1.Joi.number(),
    available: celebrate_1.Joi.boolean(),
    image: celebrate_1.Joi.string().required(),
});
exports.default = product;
