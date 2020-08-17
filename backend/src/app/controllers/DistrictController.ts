import { Request, Response } from 'express';
import District from '../models/District';

class DistrictController {
  async index(request: Request, response: Response) {
    const districts = await District.find({});

    return response.json(districts);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;

    const districts = await District.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    return response.json(districts);
  }

  async store(request: Request, response: Response) {
    const { name, city, rate } = request.body;

    const district = await District.create({
      name,
      city,
      rate,
    });

    return response.json(district);
  }

  async update(request: Request, response: Response) {
    const { name, city, rate } = request.body;
    const { id } = request.params;

    const district = await District.findOneAndUpdate(
      { _id: id },
      {
        name,
        city,
        rate,
      },
      { new: true },
    );

    return response.json(district);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await District.deleteOne({ _id: id });

    return response.status(200).send();
  }
}

export default new DistrictController();
