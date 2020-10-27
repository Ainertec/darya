"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// validations
const printerSchema_1 = __importDefault(require("../validations/printerSchema"));
const Printers_routes_1 = require("./Printers.routes");
const routes = express_1.Router();
// printers
const printersRoutes = new Printers_routes_1.PrintersRoutes(routes);
printersRoutes.getRoutes({ printer: printerSchema_1.default });
exports.default = routes;
