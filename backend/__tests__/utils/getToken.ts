import factory from '../factories';
import { Document } from 'mongoose';

interface UserInterface extends Document {
  name: string;
  password_hash: string;
  password: string;
  question: string;
  response: string;
  admin: boolean;
  generateToken(): string;
}

class Token {
  public async generate() {
    const user = await factory.create<UserInterface>('User', {
      // admin: true,
    });
    return user.generateToken();
  }
}

export default new Token().generate();
