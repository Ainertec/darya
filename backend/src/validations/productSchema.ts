import { Joi } from 'celebrate';

const product = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  cost: Joi.number().required(),
  stock: Joi.number(),
});

export default product;
