import { Router } from 'express';
import { sessionController } from '../app/useCases/Session';

export class SessionRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/sessions', (request, response) => {
      return sessionController.store(request, response);
    });
  }
}
