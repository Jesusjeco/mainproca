import { ProductOrder } from "./ProductOrder";

export interface SellOrder {
  _id: string
  client_id: string;
  address: string;
  products: ProductOrder[];
  totalPrice: number;
  orderDate: Date;
}

export const emptySellOrder = {
  _id: "",
  client_id: "",
  address: "",
  products: [],
  orderDate: new Date(),
  totalPrice: 0
}



export const API_PURCHASE_ORDER_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_SELL_ORDER;
