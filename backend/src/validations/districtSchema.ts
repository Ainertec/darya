import { Joi } from 'celebrate';

const district = Joi.object().keys({
  name: Joi.string().required(),
  city: Joi.string().required(),
  rate: Joi.number().required(),
});

export default district;
