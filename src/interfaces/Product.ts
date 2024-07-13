//Defining the interface for Product
export interface Product {
  _id: string,
  name: string,
  quantity: number,
  price: number,
  description?: string
}

export const emptyProduct = {
  _id: "",
  name: "",
  quantity: 0,
  price: 0,
  description: ""
}

export const API_PRODUCTS_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_PRODUCTS;