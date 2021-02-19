/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import User from '../app/models/User';

class Authentication {
  public async auth(request: Request, response: Response, next: NextFunction) {
    const userId = request.userId;

    const user = await User.findOne({ _id: userId });

    if (!user?.admin) {
      return response.status(401).json('Restrict area');
    }

    next();
  }
}

export default new Authentication().auth;
