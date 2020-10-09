// import { IClientRepository } from '../../Repositories/IClientRepository';
import User from '../../models/User';

export class SessionUseCase {
  // constructor(private repository: IClientRepository) {}

  async createSession(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('user does not exist');
    }
    const correctPassword = await user.checkPassword(password);

    if (!correctPassword) {
      throw new Error('incorrect password');
    }
    const token = await user.generateToken();
    await user.populate('address.district').execPopulate();
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
