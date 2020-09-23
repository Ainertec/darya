/* eslint-disable camelcase */
/* eslint-disable func-names */
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  password: string;
  question: string;
  response: string;
  admin: boolean;
  generateToken(): string;
  checkPassword(password: string): Promise<boolean>;
}

interface UserSchemaInterface extends IUser {
  password_hash: string;
}

const Questions = Object.freeze({
  first: 'Qual o modelo do seu primeiro carro?',
  second: 'Qual o nome do seu melhor amigo de infância?',
  third: 'Qual o nome do seu primeiro animal de estimação?',
  fourth: 'Qual o nome da sua mãe?',
  fifth: 'Qual sua cor preferida?',
  getQuestions() {
    const ques = [this.first, this.second, this.third, this.fourth, this.fifth];
    return ques;
  },
});

const UserSchema = new Schema<UserSchemaInterface>({
  name: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    // select: false,
  },
  question: {
    type: String,
    enum: Object.values(Questions),
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  response: {
    type: String,
    required: true,
  },
});

Object.assign(UserSchema.statics, {
  Questions,
});

UserSchema.virtual('password', { type: String, require: true });

UserSchema.pre<UserSchemaInterface>('save', async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password_hash = hash;
  }
  next();
});

UserSchema.methods.checkPassword = function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password_hash);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, String(process.env.APP_SECRET));
};

export { Questions };
export const User = model<IUser>('User', UserSchema);
