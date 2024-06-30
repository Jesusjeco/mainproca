
export interface PurchaseOrder {
  _id?: string
  client: string; // Assuming client is an ObjectId in string form
  products: ProductOrder[];
  orderDate: Date;
  totalPrice: number;
}

export interface ProductOrder {
  product: string; // Assuming product is an ObjectId in string form
  quantity: number;
}

export interface PurchaseOrderApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const emptyPurchaseOrder = {
  client: "", // Assuming client is an ObjectId in string form
  products: [],
  orderDate: new Date(),
  totalPrice: 0
}

export const API_PURCHASE_ORDER_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_PURCHASE_ORDER;
