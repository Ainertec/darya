import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

export const paramName = {
  name: Joi.string(),
};

export const paramId = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
