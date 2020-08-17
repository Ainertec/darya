import { Router } from 'express';
import { celebrate } from 'celebrate';
import DeliverymanController from '../app/controllers/DeliverymanController';
import { IValidationsDeliveryman } from './routesDTO';

export class DeliverymansRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsDeliveryman) {
    this.routes.get('/deliverymans', DeliverymanController.index);
    this.routes.get(
      '/deliverymans/hasDelivery',
      DeliverymanController.showByDelivery,
    );
    this.routes.get('/deliverymans/availables', DeliverymanController.show);
    this.routes.get(
      '/deliverymans/working_days',
      DeliverymanController.showByWorking,
    );
    this.routes.get('/deliverymans/:name', DeliverymanController.showByName);
    this.routes.post(
      '/deliverymans',
      celebrate({ body: validations.deliveryman }),
      DeliverymanController.store,
    );
    this.routes.put(
      '/deliverymans/:id',
      celebrate({ body: validations.deliveryman, params: validations.paramId }),
      DeliverymanController.update,
    );
    this.routes.put('/deliverymans', DeliverymanController.reset);
    this.routes.delete(
      '/deliverymans/:id',
      celebrate({ params: validations.paramId }),
      DeliverymanController.delete,
    );
  }
}
