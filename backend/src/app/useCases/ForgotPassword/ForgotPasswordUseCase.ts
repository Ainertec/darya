import User from '../../models/User';

export class ForgotPasswordUseCase {
  async getClientQuestion(username: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('user does not exist');
    }
    return { question: user.question };
  }

  async reset(username: string, response: string, newPassword: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('That user does not exist');
    }
    if (response !== user.response) {
      throw new Error('The response is wrong');
    }

    user.password = newPassword;
    await user.save();
    return user;
  }
}
