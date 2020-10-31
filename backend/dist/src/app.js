"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var celebrate_1 = require("celebrate");
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var server = new http_1.default.Server(app);
var io = socket_io_1.default(server);
app.use(cors_1.default());
app.use(express_1.default.json());
if (!(process.env.NODE_ENV === 'test'))
    mongoose_1.default.connect("" + process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
var connectedUsers = {};
io.on('connection', function (socket) {
    var userId = socket.handshake.query.userId;
    connectedUsers[userId] = socket.id;
});
app.use(function (req, res, next) {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});
app.use(routes_1.default);
app.use(celebrate_1.errors());
exports.default = server;
