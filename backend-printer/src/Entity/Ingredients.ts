/* eslint-disable no-param-reassign */
import { Schema, model, Document } from 'mongoose';

// import Product from './Product';
// import getCost from '../utils/getProductCost';

export interface IIngredientsDocument extends Document {
  name: string;
  price: number;
  priceUnit: number;
  description?: string;
  unit: string;
  stock: number;
}

const Unit = Object.freeze({
  kilogram: 'g',
  liter: 'ml',
  unity: 'unidade',

  getUnit() {
    const unit = [this.kilogram, this.liter, this.unity];
    return unit;
  },
});

const IngredientSchema = new Schema<IIngredientsDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    unit: {
      type: String,
      required: true,
      enum: Object.values(Unit),
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Object.assign(IngredientSchema.statics, {
  Unit,
});

export { Unit };

// IngredientSchema.post<IIngredientsDocument>(
//   'findOneAndUpdate',
//   async document => {
//     if (document) {
//       const ingredientID = document._id;

//       const products = await Product.find({
//         'ingredients.material': { $in: ingredientID },
//       });
//       await Promise.all(
//         products.map(async (product: ProductInterface) => {
//           const cost = await getCost(product.ingredients);
//           product.cost = cost;
//           await product.save();
//         }),
//       );
//     }
//   },
// );

// IngredientSchema.post<IIngredientsDocument>(
//   'findOneAndRemove',
//   async document => {
//     if (document) {
//       const ingredientID = document._id;
//       const products = await Product.find({
//         'ingredients.material': { $in: ingredientID },
//       });
//       await Promise.all(
//         products.map(async (product: ProductInterface) => {
//           const ingredientUpdated = product.ingredients.filter(
//             ingredient => String(ingredient.material) !== String(ingredientID),
//           );
//           product.ingredients = ingredientUpdated;
//           await product.save();
//         }),
//       );
//     }
//   },
// );

export const Ingredient = model<IIngredientsDocument>(
  'Ingredient',
  IngredientSchema,
);
