import { useClientsStore } from "../store/clientStore";

export const fetchAllClientsLoader = async () => {
  const fetchAllClients = useClientsStore.getState().fetchClients;
  await fetchAllClients()
}