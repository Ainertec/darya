import OrderController from '../app/controllers/OrderController';
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { IValidationsOrder } from './routesDTO';

export class OrdersRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsOrder) {
    this.routes.get('/orders', OrderController.index);
    this.routes.get(
      '/orders/deliveryman/:deliveryman',
      celebrate({ params: validations.paramDeliveryman }),
      OrderController.showByDeliveryman,
    );
    this.routes.get(
      '/orders/:identification',
      celebrate({ params: validations.paramIdentification }),
      OrderController.show,
    );
    this.routes.post(
      '/orders',
      celebrate({ body: validations.order }),
      OrderController.store,
    );
    this.routes.put(
      '/orders/:id',
      celebrate({ body: validations.orderUpdate }),
      OrderController.update,
    );
    this.routes.delete(
      '/orders/:id',
      celebrate({ params: validations.paramId }),
      OrderController.delete,
    );
  }
}
