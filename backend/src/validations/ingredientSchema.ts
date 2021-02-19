import { Joi } from 'celebrate';

const ingredient = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  unit: Joi.string().required(),
});

export default ingredient;
