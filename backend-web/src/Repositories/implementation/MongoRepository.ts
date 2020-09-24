import { MongooseFilterQuery } from 'mongoose';
import { Client, IClient, IClientDocument } from '../../Entity/Client';
import { IClientRepository } from '../IClientRepository';

export class MongoRepository implements IClientRepository {
  constructor(private model: typeof Client) {}

  async generateToken(username: string): Promise<string> {
    const user = await this.model.findOne({ username });
    const token = await user.generateToken();
    return token;
  }

  async checkPassword(password: string, username: string): Promise<boolean> {
    const user = await this.model.findOne({ username });
    const isCorrect = await user.checkPassword(password);
    return isCorrect;
  }

  async findByName(arg: string): Promise<IClientDocument> {
    const client = await this.model.findOne({ name: arg });
    // await client.populate('address.district').execPopulate();
    return client;
  }

  async findByUserName(arg: string): Promise<IClientDocument> {
    const client = await this.model.findOne({ username: arg });
    // await client.populate('address.district').execPopulate();
    return client;
  }

  async findOne(arg?: MongooseFilterQuery<IClient>): Promise<IClientDocument> {
    const response = await this.model.findOne(arg);
    // await response.populate('address.district').execPopulate();
    return response;
  }

  async save(arg: IClient): Promise<IClientDocument> {
    const client = await this.model.create({
      name: arg.name,
      username: arg.username,
      password: arg.password,
      address: arg.address,
      phone: arg.phone,
      question: arg.question,
      response: arg.response,
    });
    await client.populate('address.district').execPopulate();
    return client;
  }

  // update<T>(arg: T): Promise<T> {
  //   throw new Error('Method not implemented.');
  // }
}
