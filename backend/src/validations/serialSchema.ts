import { Joi } from 'celebrate';

const serialSchema = {
  password: Joi.string().required(),
};

export default serialSchema;
