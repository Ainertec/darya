// import { Client } from '../../Entity/Client';
// import { MongoRepository } from '../../Repositories/implementation/MongoRepository';
import { SessionController } from './SessionController';
import { SessionUseCase } from './SessionUseCase';

// const repository = new MongoRepository(Client);

const sessionUseCase = new SessionUseCase();

const sessionController = new SessionController(sessionUseCase);

export { sessionController, sessionUseCase };
