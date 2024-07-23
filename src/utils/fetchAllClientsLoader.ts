import { useClientsStore } from "../store/clientStore";

export const fetchAllClientsLoader = async () => {
  const fetchAllClients = useClientsStore.getState().fetchClients;
  //const fetchAllClients = useClientsStore(state => state.fetchClients)
  await fetchAllClients()
}