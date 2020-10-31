"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.openConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function openConnection() {
    if (!process.env.MONGO_URL) {
        throw new Error('MongoDb server not initializaded');
    }
    await mongoose_1.default.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
}
exports.openConnection = openConnection;
async function closeConnection() {
    await mongoose_1.default.connection.close();
}
exports.closeConnection = closeConnection;
