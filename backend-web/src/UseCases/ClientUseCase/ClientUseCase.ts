import { IClient, Questions } from '../../Entity/Client';
import { IClientRepository } from '../../Repositories/IClientRepository';

export class ClientUseCase {
  constructor(private repository: IClientRepository) {}

  async createUser(user: IClient): Promise<IClient> {
    const isValidQuestion = Questions.getQuestions().includes(user.question);

    if (!isValidQuestion) {
      throw new Error('invalid question');
    }
    const sameUserName = await this.repository.findByUserName(user.username);

    if (sameUserName) {
      throw new Error('Already exist that username');
    }
    const clientWithSameName = await this.repository.findByName(user.name);

    if (clientWithSameName) {
      let hasSamePhone = false;
      user.phone.forEach((element: string) => {
        if (clientWithSameName.phone?.includes(element)) {
          hasSamePhone = true;
        }
      });
      if (hasSamePhone) {
        throw new Error('Client has the same name and phone number');
      }
      const createdClient = await this.repository.save(user);
      return createdClient;
    }
    const createdClient = await this.repository.save(user);
    return createdClient;
  }
}
