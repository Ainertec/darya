import ClientController from '../app/controllers/ClientController';
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { IValidationsClient } from './routesDTO';

export class ClientsRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsClient) {
    this.routes.get('/clients', ClientController.index);
    this.routes.get(
      '/clients/:name',
      celebrate({ params: validations.paramName }),
      ClientController.show,
    );
    this.routes.post(
      '/clients',
      celebrate({ body: validations.client }),
      ClientController.store,
    );
    this.routes.put(
      '/clients/:id',
      celebrate({
        body: validations.clientUpdate,
        params: validations.paramId,
      }),
      ClientController.update,
    );
    this.routes.delete(
      '/clients/:id',
      celebrate({ params: validations.paramId }),
      ClientController.delete,
    );
  }
}
