
export interface SellOrder {
  _id?: string
  client: string;
  address: string;
  products: ProductOrder[];
  totalPrice: number;
  orderDate: Date;
}

export const emptySellOrder = {
  client: "",
  address: "",
  products: [],
  orderDate: new Date(),
  totalPrice: 0
}

export interface ProductOrder {
  product: string;
  price: number,
  quantity: number;
}

export const emptyProductOrder = {
  product: "",
  price: 0,
  quantity: 0
}

export const API_PURCHASE_ORDER_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_SELL_ORDER;
