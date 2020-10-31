import 'dotenv/config';
import express,{ Request, Response } from 'express';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';

import { errors } from 'celebrate';
import mongoose from 'mongoose';
import routes from './routes';


const app = express();
const server =  new http.Server(app);
const io = socketio(server);



app.use(cors());
app.use(express.json());
if (!(process.env.NODE_ENV === 'test'))
  mongoose.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

const connectedUsers = {};

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  connectedUsers[userId] = socket.id;
});

app.use((req: Request, res:Response, next) => {
  req.io = io;
  req.connectedUser = connectedUsers;

  return next();
});



app.use(routes);
app.use(errors());
export default server;
