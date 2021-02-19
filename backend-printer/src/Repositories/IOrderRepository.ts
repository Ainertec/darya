import {IUser  } from '../Entity/User';

import { IProduct } from '../Entity/Product';
import { OrderInterface } from '../interfaces/base';

export interface IOrderRepository {
  save(arg: IOrderSaveRequest): Promise<OrderInterface>;
  findClientId(id: string): Promise<IUser>;
  findProductId(id: string): Promise<IProduct>;
}

export interface IOrderSaveRequest {
  items: { product: string| any; quantity: number }[];
  identification: string;
  note: string;
  addressToSend: {
    client_address_id: string;
    district_id: string;
    district_name: string;
    district_rate: number;
    street: string;
    number: number;
    reference: string;
  };
  total: number;
  user: {
    user_id: string;
    name: string;
    phone: string[];
  };
  source: string;
}
