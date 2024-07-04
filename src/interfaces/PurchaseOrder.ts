
export interface PurchaseOrder {
  _id?: string
  client: string;
  products: ProductOrder[];
  totalPrice: number;
  orderDate: Date;
}

export const emptyPurchaseOrder = {
  client: "",
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
  price: 1,
  quantity: 0
}

export interface PurchaseOrderApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const API_PURCHASE_ORDER_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_PURCHASE_ORDER;
