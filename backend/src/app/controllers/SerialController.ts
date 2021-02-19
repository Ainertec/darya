/* eslint-disable consistent-return */
import { Request, Response } from 'express';

class SerialController {
  public exit(req: Request, res: Response) {
    const { password } = req.query;
    if (Number(password) === 52164521655455362) {
      process.exit(0);
    } else {
      return res.json({ alert: 'invalid access!' });
    }
  }
}

export default new SerialController();
