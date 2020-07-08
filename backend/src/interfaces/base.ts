import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  name: string;
  price: number;
  description?: string;
  cust: number;
}
