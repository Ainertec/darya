import 'dotenv/config';
import express from 'express';
import { errors } from 'celebrate';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();
// app.use(cors());
app.use(express.json());
if (!(process.env.NODE_ENV === 'test'))
  mongoose.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
app.use(routes);
app.use(errors());
export default app;
