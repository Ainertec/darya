import mongoose from 'mongoose';

export async function openConnection() {
  if (!process.env.MONGO_URL) {
    throw new Error('MongoDb server not initializaded');
  }
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}
export async function closeConnection() {
  await mongoose.connection.close();
}
