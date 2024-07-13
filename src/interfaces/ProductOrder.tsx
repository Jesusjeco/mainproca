export interface ProductOrder {
  product_id: string;
  price: number,
  quantity: number;
}

export const emptyProductOrder = {
  product_id: "",
  price: 0.00,
  quantity: 0
}