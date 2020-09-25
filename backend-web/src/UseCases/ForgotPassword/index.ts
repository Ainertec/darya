import { Client } from '../../Entity/Client';
import { MongoRepository } from '../../Repositories/implementation/MongoRepository';
import { ForgotPasswordController } from './ForgotPasswordController';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

const repository = new MongoRepository(Client);
const forgotPasswordUseCase = new ForgotPasswordUseCase(repository);

const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
);

export { forgotPasswordController, forgotPasswordUseCase };
