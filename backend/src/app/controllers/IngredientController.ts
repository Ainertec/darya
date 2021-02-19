/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Ingredient, { Unit } from '../models/Ingredient';

class IngredientController {
  async index(request: Request, response: Response) {
    const ingredients = await Ingredient.find({});
    return response.json(ingredients);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;
    const ingredients = await Ingredient.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    return response.json(ingredients);
  }

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
      { new: true },
    );

    return response.json(ingredient);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Ingredient.findOneAndRemove({ _id: id });

    return response.status(200).send();
  }
}

export default new IngredientController();
