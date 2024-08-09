import { ProductOrder } from "./ProductOrder";

export interface PurchaseOrder {
  _id: string
  orderNumber: string,
  client_id: string;
  orderDate: Date;
  productsOrder: ProductOrder[];
}

export const emptySellOrder = {
  _id: "",
  orderNumber: "",
  client_id: "",
  orderDate: new Date(),
  productsOrder: [],
}



export const API_PURCHASE_ORDER_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_PURCHASE_ORDER;
