/* eslint-disable consistent-return */
import { IClient, Questions } from '../../Entity/Client';
import { IClientRepository } from '../../Repositories/IClientRepository';

export class ClientUseCase {
  constructor(private repository: IClientRepository) {}

  private async clientNameValidation(
    name: string,
    phone: string[],
  ): Promise<boolean> {
    const clientWithSameName = await this.repository.findByName(name);

    if (!clientWithSameName || !clientWithSameName.phone) return;
    let hasSamePhone = false;
    phone.forEach((element: string) => {
      if (clientWithSameName.phone?.includes(element)) {
        hasSamePhone = true;
      }
    });
    return hasSamePhone;
  }

  async createUser(user: IClient): Promise<IClient> {
    const isValidQuestion = Questions.getQuestions().includes(user.question);

    if (!isValidQuestion) {
      throw new Error('invalid question');
    }
    const sameUserName = await this.repository.findByUserName(user.username);

    if (sameUserName) {
      throw new Error('Already exist that username');
    }
    const clientWithSameName = await this.clientNameValidation(
      user.name,
      user.phone,
    );

    if (clientWithSameName) {
      throw new Error('Client has the same name and phone number');
    }

    const createdClient = await this.repository.save(user);
    return createdClient;
  }

  async updateUser(user: IClient, id: string): Promise<IClient> {
    const client = await this.repository.findByName(user.name);

    if (user.name && !user.phone && client?.phone) {
      const isInvalidName = await this.clientNameValidation(
        user.name,
        client.phone,
      );

      if (isInvalidName) {
        throw new Error('client has the same name and phone number');
      }
    }
    if (user.name && user.phone) {
      const isInvalidName = await this.clientNameValidation(
        user.name,
        user.phone,
      );

      if (isInvalidName) {
        throw new Error('client has the same name and phone number');
      }
    }
    const updatedClient = await this.repository.update(user, id);
    return updatedClient;
  }
}
