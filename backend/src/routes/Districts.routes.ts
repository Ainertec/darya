import { Router } from 'express';
import { celebrate } from 'celebrate';
import DistrictController from '../app/controllers/DistrictController';
import { IValidationsDistrict } from './routesDTO';
import Authorization from '../middlewares/Authorization';
import Authentication from '../middlewares/Authentication';

export class DistrictsRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsDistrict) {
    this.routes.get('/districts', DistrictController.index);
    this.routes.get(
      '/districts/:name',
      celebrate({ params: validations.paramName }),
      DistrictController.show,
    );
    this.routes.post(
      '/districts',
      Authentication,
      Authorization,
      celebrate({ body: validations.district }),
      DistrictController.store,
    );
    this.routes.put(
      '/districts/:id',
      Authentication,
      Authorization,
      celebrate({ body: validations.district, params: validations.paramId }),
      DistrictController.update,
    );
    this.routes.delete(
      '/districts/:id',
      Authentication,
      Authorization,
      celebrate({ params: validations.paramId }),
      DistrictController.delete,
    );
  }
}
