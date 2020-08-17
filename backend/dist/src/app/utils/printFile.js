"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printFile = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var shelljs_1 = require("shelljs");
var mongoose_1 = require("mongoose");
function printFile(content, fileName) {
    try {
        var buffer = Buffer.from(content, 'binary');
        var dir = process.env.NODE_ENV === 'test'
            ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes')
            : process.env.DIR_PRODUCTION;
        fs_1.default.writeFile(dir + "/" + fileName + ".rtf", buffer, { encoding: 'utf-8', flag: 'w' }, function () { });
    }
    catch (error) {
        throw new mongoose_1.Error(error.message);
    }
    var vbs = process.env.NODE_ENV === 'test'
        ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
        : process.env.DIR_INITIALIZE_PRINT;
    if (vbs) {
        setTimeout(function () {
            shelljs_1.exec(vbs);
        }, 1000);
    }
}
exports.printFile = printFile;
