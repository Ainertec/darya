import { Schema, model } from 'mongoose';
import { ProductInterface } from '../../interfaces/base';

const IngredientSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

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
    cost: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },

    ingredients: [IngredientSchema],
  },
  {
    timestamps: true,
  },
);

export default model<ProductInterface>('Product', ProductSchema);
