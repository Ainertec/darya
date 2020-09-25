import { IClientRepository } from '../../Repositories/IClientRepository';

export class ForgotPasswordUseCase {
  constructor(private repository: IClientRepository) {}

  async getClientQuestion(username: string) {
    const client = await this.repository.findByUserName(username);

    if (!client) {
      throw new Error('Client does not exist');
    }
    return { question: client.question };
  }

  async reset(username: string, response: string, newPassword: string) {
    const client = await this.repository.findByUserName(username);

    if (!client) {
      throw new Error('That client does not exist');
    }
    if (response !== client.response) {
      throw new Error('The response is wrong');
    }

    client.password = newPassword;
    const test = await this.repository.update(client, String(client._id));
    return test;
  }
}
