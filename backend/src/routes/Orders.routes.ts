import { Router } from 'express';
import { celebrate } from 'celebrate';
import OrderController from '../app/controllers/OrderController';
import { IValidationsOrder } from './routesDTO';
import Authorization from '../middlewares/Authorization';

export class OrdersRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsOrder) {
    this.routes.get('/orders', Authorization, OrderController.index);
    this.routes.get('/orders/user', OrderController.showByUser);
    this.routes.get(
      '/orders/deliveryman/:deliveryman',
      Authorization,
      celebrate({ params: validations.paramDeliveryman }),
      OrderController.showByDeliveryman,
    );
    this.routes.get(
      '/orders/:identification',
      Authorization,
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
      Authorization,
      celebrate({ body: validations.orderUpdate }),
      OrderController.update,
    );
    this.routes.delete(
      '/orders/:id',
      Authorization,
      celebrate({ params: validations.paramId }),
      OrderController.delete,
    );
  }
}
