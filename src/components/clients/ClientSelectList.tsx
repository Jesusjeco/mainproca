/*
* this components returns a full client
* based on the selected ID
*/
import { useEffect, useState } from "react"
import { Client } from "../../interfaces/Client"

interface ClientSelectListProps {
  clients: Client[]
  selectedClientId?: string
  clientResult: (client: Client | undefined) => void
  className?: string | undefined
  label?: string
}
export function ClientSelectList({ clients, selectedClientId = "", clientResult, className, label = "client_id" }: ClientSelectListProps) {
  const [clientID, setClientID] = useState<string>(selectedClientId);
  useEffect(() => {
    if (clientID) {
      const client = clients.find((client) => client._id === clientID);
      clientResult(client)
    }
  }, [clientID]);

  return (
    <>
      {
        clients.length > 0 ? (
          <select
            name={label}
            id={label}
            required
            onChange={(e) => { setClientID(e.target.value) }}
            value={clientID}
            className={className}
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>{client.name} - {client.rif}</option>
            ))}
          </select>
        ) : (
          <p className="text-red-500">Lista de clientes vacia</p>
        )
      }
    </>
  )
}