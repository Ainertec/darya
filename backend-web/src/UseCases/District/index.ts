import { District } from '../../Entity/District';
import { MongoDistrictRepository } from '../../Repositories/implementation/MongoDistrictRepository';
import { ListDistrictController } from './ListDistrictController';
import { ListDistrictUseCase } from './ListDistrictUseCase';

const repository = new MongoDistrictRepository(District);

const listDistrictUseCase = new ListDistrictUseCase(repository);

const listDistrictController = new ListDistrictController(listDistrictUseCase);

export { listDistrictUseCase, listDistrictController };
