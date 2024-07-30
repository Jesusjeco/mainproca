// src/clientsStore.ts
import { create } from 'zustand';
import { createClient, deleteClientById, editClientById, fetchAllClients } from '../apiCalls/clients';
import { Client } from '../interfaces/Client';
import { ApiResponse } from '../interfaces/ApiResponse';

interface ClientsState {
    clients: Client[]
    loading: boolean
    setLoading: (loading: boolean) => void
    fetchClients: () => Promise<void>
    getClientById: (id: string) => Client | undefined;
    createClient: (newClient: Client) => Promise<ApiResponse>
    editClientById: (newClient: Client) => Promise<ApiResponse>
    deleteClientById: (id: string) => Promise<ApiResponse>
}

export const useClientsStore = create<ClientsState>((set, get) => ({ 
    clients: [],
    loading: false,
    setLoading: (loading: boolean) => set({ loading }), // setLoading,
    fetchClients: async () => {
        set({ loading: true });
        try {
            const clients = await fetchAllClients();
            set({ clients, loading: false });
        } catch (error) {
            console.error('Failed to fetch clients', error);
        }
    },//fetchClients 
    getClientById: (id: string): Client | undefined => {
        const { clients } = get();
        const client = clients.find(client => client._id === id);
        if (client)
            return client
        else
            return undefined
    },//getClientById
    createClient: async (newClient: Client): Promise<ApiResponse> => {
        set({ loading: true });
        try {
            const client = await createClient(newClient);
            if (client) {
                set((state) => ({
                    clients: [...state.clients, client],
                }));
                set({ loading: false });
                return {
                    success: true,
                    message: "Client created succesfully",
                    data: client,
                }
            } else {
                return {
                    success: false,
                    message: "ERROR when creating client",
                    data: null,
                }
            }

        } catch (error) {
            console.error('Failed to create client', error);
            return {
                success: false,
                message: "ERROR when creating client",
                data: error,
            }
        }
    }, //createClient
    editClientById: async (client: Client): Promise<ApiResponse> => {
        set({ loading: true });
        try {
            const response = await editClientById(client);
            if (response && response.ok) {
                set((state) => ({
                    clients: state.clients.map((item) => item._id === client._id ? client : item)
                }))
                set({ loading: false });
                return {
                    success: true,
                    message: "Client updated succesfully",
                    data: response,
                }
            } else {
                return {
                    success: false,
                    message: "ERROR when updating client",
                    data: null,
                }
            }
        } catch (error) {
            console.error('Failed to update client', error);
            return {
                success: false,
                message: "ERROR when updating client",
                data: error,
            }
        }
    },//editClientById
    deleteClientById: async (id: string): Promise<ApiResponse> => {
        set({ loading: true });
        try {
            const response = await deleteClientById(id);
            if (response && response.ok) {
                set((state) => ({
                    clients: state.clients.filter(client => client._id !== id),
                }));
                set({ loading: false });
                return {
                    success: true,
                    message: "Client deleted succesfully",
                    data: response,
                }
            } else {
                return {
                    success: false,
                    message: "ERROR when deleting client",
                    data: null,
                }
            }

        } catch (error) {
            console.error('Failed to delete client', error);
            return {
                success: false,
                message: "ERROR when deleting client",
                data: error,
            }
        }
    }//deleteClientById
}));
