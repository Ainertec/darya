import { IDistrictRepository } from '../../Repositories/IDistrictRepository';

export class ListDistrictUseCase {
  constructor(private repository: IDistrictRepository) {}

  async all() {
    const districts = await this.repository.all();

    return districts;
  }

  async byName(name: string) {
    const districts = await this.repository.byName(name);

    return districts;
  }
}
