import { Router } from 'express';
import Authentication from '../middlewares/Authentication';
import { productController } from '../UseCases/Product';

export class ProductRoutes {
  constructor(private routes: Router) {}

  public getRoutes() {
    this.routes.get('/products', Authentication, (request, response) => {
      productController.index(request, response);
    });
    this.routes.get('/products/:name', Authentication, (request, response) => {
      productController.show(request, response);
    });
  }
}
