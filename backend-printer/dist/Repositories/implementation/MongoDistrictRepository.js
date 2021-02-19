// import { IDistrict } from '../../Entity/Client';
// import { District } from '../../Entity/District';
// import { IDistrictRepository } from '../IDistrictRepository';
// export class MongoDistrictRepository implements IDistrictRepository {
//   constructor(private model: typeof District) {}
//   async byName(name: string) {
//     const districts = await this.model.find({
//       name: { $regex: new RegExp(name), $options: 'i' },
//     });
//     return districts;
//   }
//   async all(): Promise<IDistrict[]> {
//     const districts = await this.model.find({});
//     return districts;
//   }
// }
