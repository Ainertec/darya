/* eslint-disable camelcase */
/* eslint-disable func-names */
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IDistrict extends Document {
  name: string;
  city: string;
  rate: number;
}
export interface IAddress extends Document {
  district: IDistrict;
  street: string;
  reference: string;
  number: number;
}
export interface IUserDocument extends Document {
  generateToken(): string;
  checkPassword(password: string): Promise<boolean>;
  name: string;
  username: string;
  password: string;
  question: string;
  response: string;
  address?: IAddress[];
  phone: string[];
  admin: boolean;
}
export interface IUserDocumentPassword extends IUserDocument {
  password_hash: string;
}
export interface IUser {
  name: string;
  username: string;
  password: string;
  question: string;
  response: string;
  address?: IAddress[];
  phone: string[];
}

export const Questions = Object.freeze({
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

const AddressSchema = new Schema({
  district: {
    type: Schema.Types.ObjectId,
    ref: 'District',
    default: null,
  },
  street: {
    type: String,
    default: null,
  },
  number: {
    type: Number,
    default: null,
  },
  reference: {
    type: String,
    default: null,
  },
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    username: {
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
    response: {
      type: String,
      required: true,
    },
    address: [AddressSchema],
    admin: {
      type: Boolean,
      default: null,
    },
    phone: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);
Object.assign(UserSchema.statics, {
  Questions,
});

UserSchema.virtual('password', { type: String, require: true });

UserSchema.pre<IUserDocumentPassword>('save', async function (next) {
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

export default model<IUserDocument>('User', UserSchema);
