import { Schema, model, Document } from 'mongoose';
import { ClientInterface } from '../../interfaces/base';

const AddressSchema = new Schema({
  district: {
    type: Schema.Types.ObjectId,
    ref: 'District',
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: null,
  },
  reference: {
    type: String,
    default: null,
  },
});

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: [AddressSchema],
    phone: [
      {
        type: String,
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<ClientInterface>('Client', ClientSchema);
