import { Request, Response } from 'express';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

export class ForgotPasswordController {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async show(request: Request, response: Response) {
    const { username } = request.params;

    try {
      const clientQuestion = await this.forgotPasswordUseCase.getClientQuestion(
        username,
      );
      return response.json(clientQuestion);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async store(request: Request, responseHttp: Response) {
    const { username, response, password } = request.body;
    try {
      const clientUpdated = await this.forgotPasswordUseCase.reset(
        username,
        response,
        password,
      );
      return responseHttp.json(clientUpdated);
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }
}
