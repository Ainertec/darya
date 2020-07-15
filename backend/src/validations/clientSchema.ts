import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const address = Joi.object().keys({
  district: Joi.custom(validObjectId, 'valid id').required(),
  street: Joi.string().required(),
  reference: Joi.string(),
  number: Joi.number(),
});

const client = Joi.object().keys({
  name: Joi.string().required(),
  address: Joi.array().items(address).required(),
  phone: Joi.string().required(),
});
export default client;
