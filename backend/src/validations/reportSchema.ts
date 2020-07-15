import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const report = {
  deliveryman_id: Joi.custom(validObjectId, 'valid id').required(),
};
export default report;
