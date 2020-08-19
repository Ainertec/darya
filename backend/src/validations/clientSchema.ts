import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const address = Joi.object().keys({
  district: Joi.custom(validObjectId, 'valid id').required(),
  street: Joi.string().required(),
  reference: Joi.string(),
  number: Joi.number(),
});

export const client = Joi.object().keys({
  name: Joi.string().required(),
  address: Joi.array().items(address),
  phone: Joi.array().items(Joi.string()),
});
export const clientUpdate = Joi.object().keys({
  name: Joi.string(),
  address: Joi.array().items(address),
  phone: Joi.array().items(Joi.string()),
});

export default client;
