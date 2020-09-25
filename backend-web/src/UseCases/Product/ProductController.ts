import { Request, Response } from 'express';
import { ProductUseCase } from './ProductUseCase';

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  async index(request: Request, response: Response) {
    try {
      const products = await this.productUseCase.all();
      return response.json(products);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;
    try {
      const products = await this.productUseCase.byName(name);
      return response.json(products);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
