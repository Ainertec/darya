"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printFile = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = require("shelljs");
const mongoose_1 = require("mongoose");
function printFile(content, fileName) {
    try {
        const buffer = Buffer.from(content, 'binary');
        const dir = process.env.NODE_ENV === 'test'
            ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes')
            : process.env.DIR_PRODUCTION;
        fs_1.default.writeFile(`${dir}/${fileName}.rtf`, buffer, { encoding: 'utf-8', flag: 'w' }, () => { });
    }
    catch (error) {
        throw new mongoose_1.Error(error.message);
    }
    const vbs = process.env.NODE_ENV === 'test'
        ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
        : process.env.DIR_INITIALIZE_PRINT;
    if (vbs) {
        setTimeout(() => {
            shelljs_1.exec(vbs);
        }, 1000);
    }
}
exports.printFile = printFile;
