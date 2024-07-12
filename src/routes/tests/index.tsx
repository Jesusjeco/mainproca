import { createFileRoute } from '@tanstack/react-router'
import { ClientSelectList } from '../../components/clients/ClientSelectList'
import { useClientsStore } from '../../store/clientStore';
import { Client, emptyClient } from '../../interfaces/Client';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/tests/')({
  component: renderComponent,
})

function renderComponent() {
  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const clients = useClientsStore(state => state.clients);

  const [client, setClient] = useState<Client>(emptyClient);
  const clientResult = (newClient: Client) => {
    setClient(newClient)
  }

  useEffect(() => {
    fetchClients()
  }, []);

  return (
    <>
      <div>Current client {client.name}</div>
      <ClientSelectList clients={clients} clientResult={clientResult} />
    </>
  )
}