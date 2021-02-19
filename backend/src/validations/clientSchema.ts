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
  username: Joi.string().required(),
  password: Joi.string().required(),
  question: Joi.string().required(),
  response: Joi.string().required(),
  admin: Joi.boolean(),
});
export const clientUpdate = Joi.object().keys({
  name: Joi.string(),
  address: Joi.array().items(address),
  phone: Joi.array().items(Joi.string()),
  username: Joi.string(),
  password: Joi.string(),
  question: Joi.string(),
  response: Joi.string(),
  admin: Joi.boolean(),
});

export default client;
