import { Router } from 'express';
import { orderController } from '../UseCases/Order';

export class OrderRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/orders', (request, response) => {
      orderController.store(request, response);
    });
  }
}
