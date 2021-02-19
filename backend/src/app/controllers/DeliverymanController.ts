/* eslint-disable camelcase */
import { Request, Response } from 'express';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(request: Request, response: Response) {
    const deliveryman = await Deliveryman.find({});

    return response.json(deliveryman);
  }

  async show(request: Request, response: Response) {
    const deliveryman = await Deliveryman.find({
      working_day: true,
      available: true,
    });

    return response.json(deliveryman);
  }

  async showByName(request: Request, response: Response) {
    const { name } = request.params;

    const deliveryman = await Deliveryman.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    return response.json(deliveryman);
  }

  async showByWorking(request: Request, response: Response) {
    const deliveryman = await Deliveryman.find({ working_day: true });

    return response.json(deliveryman);
  }

  async showByDelivery(request: Request, response: Response) {
    const deliveryman = await Deliveryman.find({
      working_day: true,
      available: true,
      hasDelivery: true,
    });

    return response.json(deliveryman);
  }

  async store(request: Request, response: Response) {
    const { name, working_day, available, phone, hasDelivery } = request.body;

    const deliveryman = await Deliveryman.create({
      name,
      working_day,
      available,
      phone,
      hasDelivery,
    });

    return response.json(deliveryman);
  }

  async update(request: Request, response: Response) {
    const { name, working_day, available, phone, hasDelivery } = request.body;
    const { id } = request.params;

    const deliveryman = await Deliveryman.findOneAndUpdate(
      { _id: id },
      {
        name,
        phone,
      },
      {
        new: true,
      },
    );
    if (!deliveryman)
      return response.status(400).json('deliveryman was not found');

    if (working_day !== undefined) deliveryman.working_day = working_day;
    if (available !== undefined) deliveryman.available = available;
    if (hasDelivery !== undefined) deliveryman.hasDelivery = hasDelivery;

    await deliveryman.save();

    return response.json(deliveryman);
  }

  async reset(request: Request, response: Response) {
    await Deliveryman.updateMany(
      {},
      { $set: { working_day: false, available: false, hasDelivery: false } },
    );

    return response.status(200).send();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Deliveryman.deleteOne({ _id: id });

    return response.status(200).send();
  }
}

export default new DeliverymanController();
