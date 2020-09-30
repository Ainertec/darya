import { Router } from 'express';
import { celebrate } from 'celebrate';
import ClientController from '../app/controllers/UserController';
import { IValidationsClient } from './routesDTO';
import UserAuth from '../middlewares/UserAuth';
import Authentication from '../middlewares/Authentication';
import Authorization from '../middlewares/Authorization';

export class UserRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsClient) {
    this.routes.get(
      '/users',
      Authentication,
      Authorization,
      ClientController.index,
    );
    this.routes.get(
      '/users/:name',
      Authentication,
      Authorization,
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
      Authentication,
      Authorization,
      celebrate({ params: validations.paramId }),
      ClientController.delete,
    );
  }
}
