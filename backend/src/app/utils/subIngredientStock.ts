import Ingredient from '../models/Ingredient';
import { Ingredients } from '../../interfaces/base';

async function subIngredientStock(
  ingredients: Ingredients[],
  itemQuantity: number,
) {
  await Promise.all(
    ingredients.map(async itemIngredient => {
      const ingredientPersisted = await Ingredient.findOne({
        _id: itemIngredient.material,
      });

      if (ingredientPersisted) {
        ingredientPersisted.stock -= itemIngredient.quantity * itemQuantity;

        await ingredientPersisted.save();
      }
    }),
  );
}

export { subIngredientStock };
