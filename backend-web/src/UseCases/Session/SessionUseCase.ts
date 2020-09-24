import { IClientRepository } from '../../Repositories/IClientRepository';

export class SessionUseCase {
  constructor(private repository: IClientRepository) {}

  async createSession(username: string, password: string) {
    const user = await this.repository.findByUserName(username);

    if (!user) {
      throw new Error('user does not exist');
    }
    const correctPassword = await this.repository.checkPassword(
      password,
      username,
    );

    if (!correctPassword) {
      throw new Error('incorrect password');
    }
    const token = await this.repository.generateToken(username);

    const serializedUser = {
      ...user.toObject(),
      password_hash: undefined,
      response: undefined,
    };
    return {
      user: serializedUser,
      token,
    };
  }
}
