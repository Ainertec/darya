import { IProductrepository } from '../../Repositories/IProductrepository';

export class ProductUseCase {
  constructor(private repository: IProductrepository) {}

  async all() {
    const products = await this.repository.all();
    return products;
  }

  async byName(name: string) {
    const products = await this.repository.byName(name);
    return products;
  }
}
