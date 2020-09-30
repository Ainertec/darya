import { Request, Response } from 'express';
import { SessionUseCase } from './SessionUseCase';

export class SessionController {
  constructor(private sessionUseCase: SessionUseCase) {}

  async store(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      const res = await this.sessionUseCase.createSession(username, password);
      return response.json(res);
    } catch (error) {
      return response.status(401).json(error.message);
    }
  }
}
