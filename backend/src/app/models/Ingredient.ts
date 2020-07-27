import { Schema, model } from 'mongoose';
import { IngredientInterface } from '../../interfaces/base';

const Unit = Object.freeze({
  kilogram: 'g',
  liter: 'ml',

  getUnit() {
    const unit = [this.kilogram, this.liter];
    return unit;
  },
});

const IngredientSchema = new Schema(
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
    unit: {
      type: String,
      required: true,
      enum: Object.values(Unit),
    },
    stock: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IngredientInterface>('Ingredient', IngredientSchema);
