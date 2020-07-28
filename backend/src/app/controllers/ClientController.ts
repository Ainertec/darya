import { Request, Response, response } from 'express';
import Client from '../models/Client';

class ClientController {
  public constructor() {
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  private async clientNameValidation(name: string, phone: string[]) {
    const clientWithSameName = await Client.findOne({ name: name });

    if (!clientWithSameName || !clientWithSameName.phone) return;
    else {
      let hasSamePhone = false;
      phone.forEach((element: string) => {
        if (clientWithSameName.phone?.includes(element)) {
          hasSamePhone = true;
          return;
        }
      });

      if (hasSamePhone) return 'Client has the same name and phone number';
    }
  }

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
    const { name, address, phone } = request.body;

    if (phone) {
      const isInvalidName = await this.clientNameValidation(name, phone);
      if (isInvalidName) {
        return response.status(400).json(isInvalidName);
      }
    }

    const client = await Client.create({
      name,
      address: address ? address : undefined,
      phone: phone ? phone : undefined,
    });

    await client.populate('address.district').execPopulate();

    return response.json(client);
  }

  async update(request: Request, response: Response) {
    const { name, address, phone } = request.body;
    const { id } = request.params;

    const client = await Client.findOne({ _id: id });

    if (!client) return response.status(400).json('Client does not exist');

    if (name && !phone && client.phone) {
      const isInvalidName = await this.clientNameValidation(name, client.phone);

      if (isInvalidName) {
        return response.status(400).json(isInvalidName);
      } else {
        client.name = name;
      }
    }
    if (name && phone) {
      const isInvalidName = await this.clientNameValidation(name, phone);

      if (isInvalidName) {
        return response.status(400).json(isInvalidName);
      } else {
        client.name = name;
      }
    }

    if (phone) {
      client.phone = phone;
    }
    if (address) {
      client.address = address;
    }

    await client.save();
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
