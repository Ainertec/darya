import { Schema, model } from 'mongoose';
import { DistrictInterface } from '../../interfaces/base';

const DistrictSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<DistrictInterface>('District', DistrictSchema);
