import { Schema, model, Document } from 'mongoose';
import { DeliverymanInterface } from '../../interfaces/base';

const DeliverimanSchema = new Schema(
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
    avaliable: {
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
  }
);

export default model<DeliverymanInterface>('Deliveryman', DeliverimanSchema);
