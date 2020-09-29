import { string } from '@hapi/joi';
import { IClient } from '../Entity/Client';
import { IOrderDocument } from '../Entity/Order';
import { IProduct } from '../Entity/Product';

export interface IOrderRepository {
  save(arg: IOrderSaveRequest): Promise<IOrderDocument>;
  findClientId(id: string): Promise<IClient>;
  findProductId(id: string): Promise<IProduct>;
}

export interface IOrderSaveRequest {
  items: { product: string; quantity: number }[];
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
  client: {
    client_id: string;
    name: string;
    phone: string[];
  };
  source: string;
}
