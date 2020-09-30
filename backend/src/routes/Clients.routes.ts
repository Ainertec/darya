import { Router } from 'express';
import { celebrate } from 'celebrate';
import ClientController from '../app/controllers/ClientController';
import { IValidationsClient } from './routesDTO';
import UserAuth from '../middlewares/UserAuth';
import Authentication from '../middlewares/Authentication';

export class ClientsRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsClient) {
    this.routes.get('/users', ClientController.index);
    this.routes.get(
      '/users/:name',
      celebrate({ params: validations.paramName }),
      ClientController.show,
    );
    this.routes.post(
      '/users',
      UserAuth,
      celebrate({ body: validations.client }),
      ClientController.store,
    );
    this.routes.put(
      '/users/:id',
      Authentication,
      celebrate({
        body: validations.clientUpdate,
        params: validations.paramId,
      }),
      ClientController.update,
    );
    this.routes.delete(
      '/users/:id',
      celebrate({ params: validations.paramId }),
      ClientController.delete,
    );
  }
}
