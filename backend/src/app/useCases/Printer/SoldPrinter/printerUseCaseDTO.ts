/* eslint-disable camelcase */
export interface ProductsAmount {
  _id: {
    id: string;
    name: string;
    description: string;
    price: number;
    cost: number;
  };
  amount: number;
}

export interface IOrdersByPayment {
  _id: string;
  orders_total: number;
  orders_total_price: number;
}

export interface IProductAmount {
  _id: {
    id: string;
    name: string;
    description: string;
    price: number;
    cost: number;
  };
  amount: number;
}
