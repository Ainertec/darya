"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramId = exports.paramName = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
exports.paramName = {
    name: celebrate_1.Joi.string(),
};
exports.paramId = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
