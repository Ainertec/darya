/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import { IngredientInterface, ProductInterface } from '../../interfaces/base';
import Product from './Product';
import getCost from '../utils/getProductCost';

const Unit = Object.freeze({
  kilogram: 'g',
  liter: 'ml',
  unity: 'unidade',

  getUnit() {
    const unit = [this.kilogram, this.liter, this.unity];
    return unit;
  },
});

const IngredientSchema = new Schema<IngredientInterface>(
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

IngredientSchema.post<IngredientInterface>(
  'findOneAndUpdate',
  async document => {
    if (document) {
      const ingredientID = document._id;

      const products = await Product.find({
        'ingredients.material': { $in: ingredientID },
      });
      await Promise.all(
        products.map(async (product: ProductInterface) => {
          const cost = await getCost(product.ingredients);
          product.cost = cost;
          await product.save();
        }),
      );
    }
  },
);

IngredientSchema.post<IngredientInterface>(
  'findOneAndRemove',
  async document => {
    if (document) {
      const ingredientID = document._id;
      const products = await Product.find({
        'ingredients.material': { $in: ingredientID },
      });
      await Promise.all(
        products.map(async (product: ProductInterface) => {
          const ingredientUpdated = product.ingredients.filter(
            ingredient => String(ingredient.material) !== String(ingredientID),
          );
          product.ingredients = ingredientUpdated;
          await product.save();
        }),
      );
    }
  },
);

export default model<IngredientInterface>('Ingredient', IngredientSchema);
