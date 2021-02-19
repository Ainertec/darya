/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomHelpers } from '@hapi/joi';

import mongoose from 'mongoose';

const validObjectId = (value: any, helpers: CustomHelpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message({ message: 'invalid id' });
  }
  return value;
};

export default validObjectId;
