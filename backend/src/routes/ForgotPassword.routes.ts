import { Router } from 'express';
import { forgotPasswordController } from '../app/useCases/ForgotPassword';

export class ForgotPasswordRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/forgot/:username', (request, response) => {
      return forgotPasswordController.show(request, response);
    });
    this.routes.post('/forgot', (request, response) => {
      return forgotPasswordController.store(request, response);
    });
  }
}
