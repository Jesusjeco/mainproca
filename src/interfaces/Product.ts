//Defining the interface for Product
export interface Product {
  _id?: string, //I am making the _id optional only because when creating a
  name: string,
  quantity: number,
  description?: string
}

export interface ProductApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const emptyProduct = {
  name: "",
  quantity: 0,
  description: ""
}

export const API_PRODUCTS_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_PRODUCTS;