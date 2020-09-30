import { ForgotPasswordController } from './ForgotPasswordController';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

const forgotPasswordUseCase = new ForgotPasswordUseCase();

const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
);

export { forgotPasswordController, forgotPasswordUseCase };
