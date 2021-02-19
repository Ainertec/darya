import { Schema, model, Document } from 'mongoose';

interface DistrictInterface extends Document {
  name: string;
  city: string;
  rate: number;
}

export interface IDistrict {
  name: string;
  city: string;
  rate: number;
}

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

export const District = model<DistrictInterface>('District', DistrictSchema);
