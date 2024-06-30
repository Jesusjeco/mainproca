// src/clientsStore.ts
import { create } from 'zustand';
import { fetchAllClients } from '../apiCalls/clients';
import { Client } from '../interfaces/Client';

interface ClientsState {
    clients: Client[];
    fetchClients: () => Promise<void>;
    getClientById: (id: string) => Client | undefined;
}

export const useClientsStore = create<ClientsState>((set,get) => ({
    clients: [],
    fetchClients: async () => {
        try {
            const clients = await fetchAllClients();
            set({ clients });
        } catch (error) {
            console.error('Failed to fetch clients', error);
        }
    },
    getClientById: (id: string) => {
      const { clients } = get();
      return clients.find(client => client._id === id);
  }
}));
