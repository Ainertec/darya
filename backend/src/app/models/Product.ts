import { Schema, model, Document } from 'mongoose';
import { ProductInterface } from '../../interfaces/base';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    cust: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ProductInterface>('Product', ProductSchema);
