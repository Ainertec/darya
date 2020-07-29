import { Request, Response } from 'express';
import Ingredient, { Unit } from '../models/Ingredient';
import Product from '../models/Product';

class IngredientController {
  async store(request: Request, response: Response) {
    const { name, description, price, stock, unit } = request.body;

    const validUnit = Unit.getUnit().includes(unit);

    if (!validUnit) {
      return response.status(400).json('Invalide unit');
    }

    const priceUnit = price / stock;

    const ingredient = await Ingredient.create({
      name,
      description,
      price,
      priceUnit,
      stock,
      unit,
    });

    return response.json(ingredient);
  }
  async update(request: Request, response: Response) {
    const { name, description, price, stock, unit } = request.body;
    const { id } = request.params;
    const priceUnit = price / stock;

    const validUnit = Unit.getUnit().includes(unit);

    if (!validUnit) {
      return response.status(400).json('Invalide unit');
    }

    const ingredient = await Ingredient.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        price,
        priceUnit,
        stock,
        unit,
      },
      { new: true }
    );

    return response.json(ingredient);
  }
}

export default new IngredientController();
