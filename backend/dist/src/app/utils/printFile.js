"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printFile = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function printFile(content, fileName) {
    var buffer = Buffer.from(content, 'binary');
    var dir = process.env.NODE_ENV === 'test'
        ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;
    fs_1.default.writeFile(dir + "/" + fileName + ".rtf", buffer, { encoding: 'utf-8', flag: 'w' }, function (err) {
        if (err)
            throw new Error('Erro when try print');
    });
    // const vbs =
    //   process.env.NODE_ENV === 'test'
    //     ? path.resolve(
    //         __dirname,
    //         '..',
    //         '..',
    //         '..',
    //         '__tests__',
    //         'recipes',
    //         'impressao.vbs',
    //       )
    //     : process.env.DIR_INITIALIZE_PRINT;
    // if (vbs) {
    //   setTimeout(() => {
    //     exec(vbs);
    //   }, 1000);
    // }
}
exports.printFile = printFile;
