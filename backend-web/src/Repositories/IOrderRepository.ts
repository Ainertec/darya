import { IClient } from '../Entity/Client';
import { IOrder } from '../Entity/Order';

export interface IOrderRepository {
  save(arg: IOrderSaveRequest): Promise<IOrder>;
  findClientId(id: string): Promise<IClient>;
}

interface IOrderSaveRequest {
  items: { product: string; quantity: number }[];
  note: string;
  client_address_id: string;
}
