/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Product from '../models/Product';
import User from '../models/User';
import getCost from '../utils/getProductCost';

class ProductController {
  public constructor() {
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response) {
    const products = await Product.find({}).populate('ingredients.material');
    return response.json(products);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;

    const products = await Product.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    }).populate('ingredients.material')

    return response.json(products);
  }

  async store(request: Request, response: Response) {
    const { name, price, description, ingredients, available, image } = request.body;
    const cost = await getCost(ingredients);
    const product = await Product.create({
      name,
      price,
      cost,
      description,
      ingredients,
      available,
      image,
    });
    await product.populate('ingredients.material').execPopulate();
    return response.json(product);
  }

  async update(request: Request, response: Response) {
    const { name, price, ingredients, description, available, image } = request.body;
    const { id } = request.params;
    const cost = await getCost(ingredients);

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        description,
        ingredients,
        cost,
        available,
        image,
      },
      { new: true },
    );
    if (!product) return response.status(400).json('product not found');

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
