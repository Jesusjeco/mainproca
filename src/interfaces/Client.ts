//Defining the interface for Client
export interface Client {
  _id?: string, //I am making the _id optional only because when creating a
  name: string,
  description?: string
}

export interface ClientApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const emptyClient = { 
  name: "",
  description: ""
}

export const API_CLIENTS_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_CLIENTS;