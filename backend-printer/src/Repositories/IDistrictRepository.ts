import { IDistrict } from '../Entity/User';

export interface IDistrictRepository {
  byName(name: string);
  all(): Promise<IDistrict[]>;
}
