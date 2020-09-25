import { Request, Response } from 'express';
import { ListDistrictUseCase } from './ListDistrictUseCase';

export class ListDistrictController {
  constructor(private listDistrictUseCase: ListDistrictUseCase) {}

  async index(request: Request, response: Response) {
    try {
      const district = await this.listDistrictUseCase.all();
      return response.json(district);
    } catch (error) {
      return response.status(400).json();
    }
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;
    try {
      const district = await this.listDistrictUseCase.byName(name);
      return response.json(district);
    } catch (error) {
      return response.status(400).json();
    }
  }
}
