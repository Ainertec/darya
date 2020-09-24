import { Router } from 'express';
import Authentication from '../middlewares/Authentication';
import { clientController } from '../UseCases/ClientUseCase';

// import { IValidationsClient } from './routesDTO';

export class ClientsRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/clients/questions', (request, response) => {
      return clientController.getQuestions(request, response);
    });
    // this.routes.get(
    //   '/clients/:name',
    //   celebrate({ params: validations.paramName }),
    //   ClientController.show,
    // );
    this.routes.post('/clients', (request, response) => {
      return clientController.store(request, response);
    });
    this.routes.put('/clients', Authentication, (request, response) => {
      return clientController.update(request, response);
    });

    // this.routes.delete(
    //   '/clients/:id',
    //   celebrate({ params: validations.paramId }),
    //   ClientController.delete,
    // );
  }
}
