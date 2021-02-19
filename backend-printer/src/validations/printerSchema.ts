import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const printer = Joi.object().keys({
  id: Joi.custom(validObjectId, 'valid id').required(),
});
export default printer;
