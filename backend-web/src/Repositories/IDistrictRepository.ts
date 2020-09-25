import { IDistrict } from '../Entity/Client';

export interface IDistrictRepository {
  byName(name: string);
  all(): Promise<IDistrict[]>;
}
