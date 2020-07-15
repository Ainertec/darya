import { Request, Response } from 'express';
import Client from '../models/Client';

class ClientController {
  async index(request: Request, response: Response) {
    const clients = await Client.find().populate('address.district');

    return response.json(clients);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;
    const clients = await Client.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    }).populate('address.district');

    return response.json(clients);
  }

  async store(request: Request, response: Response) {
    const { name, address } = request.body;
    const phone = String(request.body.phone);

    const phones = phone.split(',').map((phoneOne) => phoneOne.trim());
    const client = await Client.create({
      name,
      address,
      phone: phones,
    });

    await client.populate('address.district').execPopulate();

    return response.json(client);
  }

  async update(request: Request, response: Response) {
    const { name, address } = request.body;
    const { id } = request.params;
    const phone = String(request.body.phone);

    const phones = phone.split(',').map((phoneOne) => phoneOne.trim());

    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        name,
        address,
        phone: phones,
      },
      { new: true }
    );

    if (!client) return response.status(400).json('Client does not exist');

    await client.populate('address.district').execPopulate();

    return response.json(client);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Client.deleteOne({ _id: id });

    return response.status(200).send();
  }
}

export default new ClientController();
