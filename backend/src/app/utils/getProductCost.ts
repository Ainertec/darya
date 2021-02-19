import Ingredient from '../models/Ingredient';
import { Ingredients } from '../../interfaces/base';

async function getCost(ingredients: Ingredients[]) {
  let cost = 0;
  await Promise.all(
    ingredients.map(async itemIngredient => {
      const ingredient = await Ingredient.findOne({
        _id: itemIngredient.material,
      });
      if (ingredient) {
        cost += ingredient.priceUnit * itemIngredient.quantity;
      }
    }),
  );
  return cost;
}

export default getCost;
