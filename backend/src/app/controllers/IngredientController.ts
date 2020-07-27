import { Request, Response } from 'express';
import Ingredient from '../models/Ingredient';
class IngredientController {
  async store(request: Request, response: Response) {
    const { name, description, price, stock, unit } = request.body;

    const ingredient = await Ingredient.create({
      name,
      description,
      price,
      stock,
      unit,
    });

    return response.json(ingredient);
  }
}

export default new IngredientController();
