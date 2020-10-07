import { Router } from 'express';
import { celebrate } from 'celebrate';
import DistrictController from '../app/controllers/DistrictController';
import { IValidationsDistrict } from './routesDTO';
import Authorization from '../middlewares/Authorization';

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
      Authorization,
      celebrate({ body: validations.district }),
      DistrictController.store,
    );
    this.routes.put(
      '/districts/:id',
      Authorization,
      celebrate({ body: validations.district, params: validations.paramId }),
      DistrictController.update,
    );
    this.routes.delete(
      '/districts/:id',
      Authorization,
      celebrate({ params: validations.paramId }),
      DistrictController.delete,
    );
  }
}
