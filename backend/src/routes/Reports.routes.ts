import { Router } from 'express';
import { celebrate } from 'celebrate';
import ReportController from '../app/controllers/ReportController';
import { IDeliverymanID } from './routesDTO';

export class ReportsRoutes {
  constructor(private routes: Router) {}

  getRoutes(report: IDeliverymanID) {
    this.routes.get(
      '/reports/deliveryman/rate/:deliveryman_id',
      celebrate({ params: report }),
      ReportController.deliverymanPayment,
    );
    this.routes.get('/reports/orders/profit', ReportController.ordersProfit);
    this.routes.get(
      '/reports/deliveryman/orders/:deliveryman_id',
      celebrate({ params: report }),
      ReportController.allFinishedOrdersByDeliveryman,
    );
    this.routes.get(
      '/reports/products/dispense_gain',
      ReportController.productsDispenseAndGain,
    );
    this.routes.get(
      '/reports/products/amount',
      ReportController.productsAmount,
    );
    this.routes.delete('/reports', ReportController.delete);
  }
}
