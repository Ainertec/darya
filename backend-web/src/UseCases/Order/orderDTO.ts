export interface ICreateOrderRequest {
  items: { product: string; quantity: number }[];
  note: string;
  client_address_id: string;
}
