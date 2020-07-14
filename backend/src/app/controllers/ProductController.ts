import { Request, Response } from 'express';
import Product from '../models/Product';

class ProductController {
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
    const { name, price, cost, description } = request.body;
    const product = await Product.create({
      name,
      price,
      cost,
      description,
    });

    return response.json(product);
  }
  async update(request: Request, response: Response) {
    const { name, price, cost, description } = request.body;
    const { id } = request.params;

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        description,
        cost,
      },
      { new: true }
    );

    return response.json(product);
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Product.deleteOne({ _id: id });

    return response.status(200).send();
  }
}

export default new ProductController();
