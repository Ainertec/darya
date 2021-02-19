/* eslint-disable camelcase */
import Joi from '@hapi/joi';

interface IParamName {
  name: Joi.StringSchema;
}
interface IParamId {
  id: Joi.AnySchema;
}
interface IParamIdentification {
  identification: Joi.StringSchema;
}
interface IParamDeliveryman {
  deliveryman: Joi.StringSchema;
}

export interface IValidationsProduct {
  paramName: IParamName;
  product: Joi.ObjectSchema;
  paramId: IParamId;
}
export interface IValidationsClient {
  paramName: IParamName;
  client: Joi.ObjectSchema;
  clientUpdate: Joi.ObjectSchema;
  paramId: IParamId;
}
export interface IValidationsIngredient {
  paramName: IParamName;
  ingredient: Joi.ObjectSchema;
  paramId: IParamId;
}
export interface IValidationsDeliveryman {
  paramName: IParamName;
  deliveryman: Joi.ObjectSchema;
  paramId: IParamId;
}
export interface IValidationsDistrict {
  paramName: IParamName;
  district: Joi.ObjectSchema;
  paramId: IParamId;
}
export interface IValidationsOrder {
  paramIdentification: IParamIdentification;
  order: Joi.ObjectSchema;
  orderUpdate: Joi.ObjectSchema;
  paramId: IParamId;
  paramDeliveryman: IParamDeliveryman;
}

export interface IDeliverymanID {
  deliveryman_id: Joi.AnySchema;
}

export interface IValidationsPrinter {
  printer: Joi.AnySchema;
}
