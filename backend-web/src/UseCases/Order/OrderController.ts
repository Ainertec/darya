import { Request, Response } from 'express';
import { OrderUseCase } from './OrderUseCase';

export class OrderController {
  constructor(private orderUseCase: OrderUseCase) {}

  async store(request: Request, response: Response) {
    const { items, note, client_address_id } = request.body;
    const clientId = request.userId;
    try {
      const order = await this.orderUseCase.createOrder(
        {
          items,
          note,
          client_address_id,
        },
        clientId,
      );
      return response.status(201).json(order);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
