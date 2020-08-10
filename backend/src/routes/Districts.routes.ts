import DistrictController from '../app/controllers/DistrictController';
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { IValidationsDistrict } from './routesDTO';

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
      celebrate({ body: validations.district }),
      DistrictController.store,
    );
    this.routes.put(
      '/districts/:id',
      celebrate({ body: validations.district, params: validations.paramId }),
      DistrictController.update,
    );
    this.routes.delete(
      '/districts/:id',
      celebrate({ params: validations.paramId }),
      DistrictController.delete,
    );
  }
}