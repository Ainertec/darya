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
export interface AddressInterface extends Document {
  district: DistrictInterface;
  street: string;
  reference: string;
  number: number;
}
export interface ClientInterface extends Document {
  name: string;
  address: AddressInterface[];
  phone: string[];
}
