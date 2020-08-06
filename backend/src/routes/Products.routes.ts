import ProductController from '../app/controllers/ProductController';
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { IValidationsProduct } from './routesDTO';

export class ProductRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsProduct) {
    this.routes.get('/products', ProductController.index);
    this.routes.get(
      '/products/:name',
      celebrate({ params: validations.paramName }),
      ProductController.show,
    );
    this.routes.post(
      '/products',
      celebrate({ body: validations.product }),
      ProductController.store,
    );
    this.routes.put(
      '/products/:id',
      celebrate({ body: validations.product, params: validations.paramId }),
      ProductController.update,
    );
    this.routes.delete(
      '/products/:id',
      celebrate({ params: validations.paramId }),
      ProductController.delete,
    );
  }
}
