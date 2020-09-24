import { MongooseFilterQuery, Types } from 'mongoose';
import { IClient, IClientDocument } from '../Entity/Client';

export interface IClientRepository {
  findOne(arg: MongooseFilterQuery<IClient>): Promise<IClientDocument>;
  findByName(arg: string): Promise<IClientDocument>;
  findByUserName(arg: string): Promise<IClientDocument>;
  save(arg: IClient): Promise<IClientDocument>;
  checkPassword(password: string, username: string): Promise<boolean>;
  generateToken(username: string): Promise<string>;
  update<T>(arg: IClient, id: string): Promise<IClientDocument>;
}
