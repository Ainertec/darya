import { MongooseFilterQuery, Types } from 'mongoose';
import { IUser, IUserDocument } from '../Entity/User';

export interface IUserRepository {
  findOne(arg: MongooseFilterQuery<IUser>): Promise<IUserDocument>;
  findByName(arg: string): Promise<IUserDocument>;
  findByUserName(arg: string): Promise<IUserDocument>;
  save(arg: IUser): Promise<IUserDocument>;
  checkPassword(password: string, username: string): Promise<boolean>;
  generateToken(username: string): Promise<string>;
  update<T>(arg: IUser, id: string): Promise<IUserDocument>;
}
