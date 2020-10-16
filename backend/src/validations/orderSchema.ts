import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const items = Joi.object().keys({
  product: Joi.custom(validObjectId, 'valid id').required(),
  quantity: Joi.number().required(),
});

export const order = Joi.object().keys({
  user_id: Joi.custom(validObjectId, 'valid id').required(),
  deliveryman: Joi.custom(validObjectId, 'valid id'),
  user_address_id: Joi.custom(validObjectId, 'valid id'),
  items: Joi.array().items(items).required(),
  source: Joi.string().required(),
  note: Joi.string(),
  payment: Joi.string(),
  viewed: Joi.boolean(),
});
export const orderUpdate = Joi.object().keys({
  user_id: Joi.custom(validObjectId, 'valid id'),
  deliveryman: Joi.custom(validObjectId, 'valid id'),
  user_address_id: Joi.custom(validObjectId, 'valid id'),
  items: Joi.array().items(items),
  source: Joi.string(),
  note: Joi.string(),
  payment: Joi.string(),
  identification: Joi.string(),
  finished: Joi.boolean(),
  viewed: Joi.boolean(),
});

export const paramIdentification = {
  identification: Joi.string().required(),
};
export const paramDeliveryman = {
  deliveryman: Joi.string().required(),
};
