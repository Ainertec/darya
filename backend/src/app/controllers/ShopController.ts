import { Request, Response } from "express";

import {Shop} from '../../services/openShop';

export class ShopController{

  async store(request: Request, response: Response){
    const {open} = request.body;
    Shop.setOpen(open);
    request.io.emit('shop',open);
    return response.status(200).send({});
  }

  async index(request: Request, response: Response){
   const open = Shop.getOpen();
    return response.json({open:open});
  }
}