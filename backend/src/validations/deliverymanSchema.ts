import { Joi } from 'celebrate';

const deliveryman = Joi.object().keys({
  name: Joi.string().required(),
  working_day: Joi.boolean(),
  available: Joi.boolean(),
  hasDelivery: Joi.boolean(),
  phone: Joi.string().required(),
});
export default deliveryman;
