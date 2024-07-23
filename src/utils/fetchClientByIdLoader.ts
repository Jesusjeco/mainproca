import { Client } from "../interfaces/Client";
import { useClientsStore } from "../store/clientStore"

export const fetchClientByIdLoader = async (clientId: string): Promise<Client | undefined> => {
  //const getClientById = useClientsStore(state => state.getClientById)
  const getClientById = useClientsStore.getState().getClientById
  const client = getClientById(clientId);
  return client
}