import { Router } from 'express';
import { listDistrictController } from '../UseCases/District';

export class DistrictsRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/districts', (request, response) => {
      listDistrictController.index(request, response);
    });
    this.routes.get('/districts/:name', (request, response) => {
      listDistrictController.show(request, response);
    });
  }
}
