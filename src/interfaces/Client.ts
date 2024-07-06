//Defining the interface for Client
export interface Client {
  //I am making the _id optional only because when creating a client we will not have an ID. The system will make it later on
  _id?: string,
  rif: string,
  name: string,
  number: string,
  email: string,
  legal_address: string,
  offices?: ClientOffice[],
  description?: string
}

export const emptyClient = {
  rif: "",
  name: "",
  legal_address: ""
}

export interface ClientOffice {
  address: string
}

export const emptyClientOffice = {
  address: ""
}

export const API_CLIENTS_URL = import.meta.env.VITE_API_URL_BASE + import.meta.env.VITE_API_URL_CLIENTS;