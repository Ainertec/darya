import { Request, Response } from 'express';
import { Questions } from '../../Entity/Client';
import { ClientUseCase } from './ClientUseCase';

export class ClientController {
  constructor(private clientUseCase: ClientUseCase) {}

  async getQuestions(req: Request, res: Response): Promise<Response> {
    const questions = Questions.getQuestions();
    return res.json(questions);
  }

  async store(request: Request, responseHttp: Response) {
    const {
      name,
      username,
      password,
      phone,
      address,
      question,
      response,
    } = request.body;

    try {
      const client = await this.clientUseCase.createUser({
        name,
        username,
        password,
        phone,
        address,
        question,
        response,
      });
      return responseHttp.status(201).json(client);
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }

  async update(request: Request, responseHttp: Response) {
    const {
      name,
      username,
      password,
      phone,
      address,
      question,
      response,
    } = request.body;
    const id = request.userId;

    try {
      const client = await this.clientUseCase.updateUser(
        {
          name,
          username,
          password,
          phone,
          address,
          question,
          response,
        },
        id,
      );
      return responseHttp.status(200).json(client);
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }
}
