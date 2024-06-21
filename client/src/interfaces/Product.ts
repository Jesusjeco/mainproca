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