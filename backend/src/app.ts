import 'dotenv/config';
import express from 'express';
import { errors } from 'celebrate';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();
// app.use(cors());
app.use(express.json());
if (!(process.env.NODE_ENV === 'test')) console.log('dburl', process.env.DB_URL);
mongoose.connect('mongodb://localhost:27017/darya', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.use(routes);
app.use(errors());
export default app;
