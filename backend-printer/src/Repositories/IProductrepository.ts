import { IProduct } from '../Entity/Product';

export interface IProductrepository {
  byName(name: string);
  all(): Promise<IProduct[]>;
}
