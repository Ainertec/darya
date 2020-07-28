import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const ingredients = Joi.object().keys({
  material: Joi.custom(validObjectId, 'valid id').required(),
  quantity: Joi.number().required(),
});
const product = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  ingredients: Joi.array().items(ingredients),
  price: Joi.number().required(),
  cost: Joi.number(),
  stock: Joi.number(),
});

export default product;
