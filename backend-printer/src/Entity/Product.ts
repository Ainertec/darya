import { Schema, model, Document } from 'mongoose';
import { IIngredientsDocument } from './Ingredients';

export interface IProductDocument extends Document {
  name: string;
  price: number;
  description?: string;
  ingredients: Ingredients[];
  cost: number;
}
export interface IProduct {
  name: string;
  price: number;
  description?: string;
  ingredients: Ingredients[];
  cost: number;
}

interface Ingredients {
  material: IIngredientsDocument;
  quantity: number;
}

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

    ingredients: [IngredientSchema],
  },
  {
    timestamps: true,
  },
);

export const Product = model<IProductDocument>('Product', ProductSchema);
