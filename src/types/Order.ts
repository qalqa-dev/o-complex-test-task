export type OrderEntity = {
  phone: string;
  cart: {
    id: number;
    quantity: number;
  }[];
};
