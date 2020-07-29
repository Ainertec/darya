import { Request, Response } from 'express';
import Product from '../models/Product';
import Ingredient from '../models/Ingredient';
import { Ingredients } from '../../interfaces/base';
class ProductController {
  public constructor() {
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  private async getCost(ingredients: Ingredients[]) {
    let cost = 0;
    await Promise.all(
      ingredients.map(async (itemIngredient) => {
        const ingredient = await Ingredient.findOne({ _id: itemIngredient.material });
        if (ingredient) {
          cost += ingredient.priceUnit * itemIngredient.quantity;
        }
      })
    );

    return cost;
  }

  async index(request: Request, response: Response) {
    const products = await Product.find({});

    return response.json(products);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;
    const products = await Product.find({ name: { $regex: new RegExp(name), $options: 'i' } });

    return response.json(products);
  }

  async store(request: Request, response: Response) {
    const { name, price, description, stock, ingredients } = request.body;
    const cost = await this.getCost(ingredients);
    const product = await Product.create({
      name,
      price,
      cost,
      description,
      ingredients,
      stock,
    });
    await product.populate('ingredients.material').execPopulate();
    return response.json(product);
  }
  async update(request: Request, response: Response) {
    const { name, price, ingredients, description, stock } = request.body;
    const { id } = request.params;
    const cost = await this.getCost(ingredients);

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        description,
        ingredients,
        cost,
      },
      { new: true }
    );
    if (!product) return response.status(400).json('product not found');
    if (stock) product.stock = stock;

    await product.save();

    await product.populate('ingredients.material').execPopulate();

    return response.json(product);
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Product.deleteOne({ _id: id });

    return response.status(200).send();
  }
}

export default new ProductController();
