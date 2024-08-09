import { ProductOrder } from "./ProductOrder";

export interface SellOrder {
  _id: string
  orderNumber: string,
  client_id: string;
  orderDate: Date;
  address: string;
  products: ProductOrder[];
  subTotal: number;
  total: number;
}

export const emptySellOrder = {
  _id: "",
  orderNumber: "",
  client_id: "",
  orderDate: new Date(),
  address: "",
  products: [],
  subTotal: 0,
  total: 0,
}



export const API_SELL_ORDER_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_SELL_ORDER;
