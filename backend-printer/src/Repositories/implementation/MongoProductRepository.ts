import { IProduct, Product } from '../../Entity/Product';
import { IProductrepository } from '../IProductrepository';

export class MongoProductRepository implements IProductrepository {
  constructor(private model: typeof Product) {}

  async byName(name: string) {
    const products = await this.model.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    return products;
  }

  async all(): Promise<IProduct[]> {
    const products = await this.model.find({});
    return products;
  }
}
