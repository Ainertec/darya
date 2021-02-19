import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class UserAuth {
  public async auth(request: Request, response: Response, next: NextFunction) {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      return next();
    }
    const [, token] = authHeaders.split(' ');

    try {
      const jwtPayload = <any>jwt.verify(token, process.env.APP_SECRET);

      request.userId = jwtPayload.id;
      return next();
    } catch (error) {
      console.log(error.message);
      return response.status(401).json({ message: 'Token invalid' });
    }
  }
}

export default new UserAuth().auth;
