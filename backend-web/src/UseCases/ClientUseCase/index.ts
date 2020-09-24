import { Client } from '../../Entity/Client';
import { MongoRepository } from '../../Repositories/implementation/MongoRepository';
import { ClientController } from './ClientController';
import { ClientUseCase } from './ClientUseCase';

const repository = new MongoRepository(Client);

const clientUseCase = new ClientUseCase(repository);

const clientController = new ClientController(clientUseCase);

export { clientController, clientUseCase };
