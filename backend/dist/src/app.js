"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const celebrate_1 = require("celebrate");
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
const server = new http_1.default.Server(app);
const io = socket_io_1.default(server);
app.use(cors_1.default());
app.use(express_1.default.json());
if (!(process.env.NODE_ENV === 'test'))
    mongoose_1.default.connect(`${process.env.DB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
const connectedUsers = {};
io.on('connection', (socket) => {
    const { userId } = socket.handshake.query;
    connectedUsers[userId] = socket.id;
});
app.use((req, res, next) => {
    req.io = io;
    req.connectedUser = connectedUsers;
    return next();
});
app.use(routes_1.default);
app.use(celebrate_1.errors());
exports.default = server;
