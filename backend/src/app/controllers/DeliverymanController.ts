import { Request, Response } from 'express';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(request: Request, response: Response) {
    const deliverymans = await Deliveryman.find({});

    return response.json(deliverymans);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const deliveryman = await Deliveryman.findOne({ _id: id });

    return response.json(deliveryman);
  }

  async store(request: Request, response: Response) {
    const { name, working_day, avaliable } = request.body;

    const deliveryman = await Deliveryman.create({
      name,
      working_day,
      avaliable,
    });

    return response.json(deliveryman);
  }

  async update(request: Request, response: Response) {
    const { name, working_day, avaliable } = request.body;
    const { id } = request.params;

    const deliveryman = await Deliveryman.findOneAndUpdate(
      { _id: id },
      {
        name,
      },
      {
        new: true,
      }
    );
    if (!deliveryman) return response.status(400).json('deliveryman was not found');

    if (working_day) deliveryman.working_day = working_day;
    if (avaliable) deliveryman.avaliable = avaliable;

    return response.json(deliveryman);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deliveryman = await Deliveryman.deleteOne({ _id: id });

    return response.status(200).send();
  }
}

export default new DeliverymanController();
