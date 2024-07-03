//Defining the interface for Client
export interface Client {
  _id?: string, //I am making the _id optional only because when creating a
  rif: string,
  name: string,
  legal_address: string,
  office?: string,
  description?: string
}

export const emptyClient = {
  rif: "",
  name: "",
  legal_address: ""
}

export const API_CLIENTS_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_CLIENTS;