"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
var report = {
    deliveryman_id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
exports.default = report;
