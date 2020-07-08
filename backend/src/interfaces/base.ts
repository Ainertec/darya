import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  name: string;
  price: number;
  description?: string;
  cust: number;
}

export interface DeliverymanInterface extends Document {
  name: string;
  working_day: boolean;
  avaliable?: boolean;
  phone: string;
}
export interface DistrictInterface extends Document {
  name: string;
  city: string;
  rate: number;
}
