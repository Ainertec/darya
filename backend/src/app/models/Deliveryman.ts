import { Schema, model } from 'mongoose';
import { DeliverymanInterface } from '../../interfaces/base';

const DeliverymanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    working_day: {
      type: Boolean,
      // required: true,
      default: false,
    },
    available: {
      type: Boolean,
      // required: true,
      default: false,
    },
    hasDelivery: {
      type: Boolean,
      // required: true,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<DeliverymanInterface>('Deliveryman', DeliverymanSchema);
