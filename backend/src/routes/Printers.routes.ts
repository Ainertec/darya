import PrinterController from '../app/controllers/PrinterController';
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { IValidationsPrinter } from './routesDTO';

export class PrintersRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsPrinter) {
    this.routes.post(
      '/printers',
      celebrate({ body: validations.printer }),
      PrinterController.store,
    );

    this.routes.get('/printers', PrinterController.soldPrint);
  }
}
