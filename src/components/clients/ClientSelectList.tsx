/*
* this components returns a full client
* based on the selected ID
*/
import { useEffect, useState } from "react"
import { Client } from "../../interfaces/Client"

interface ClientSelectListProps {
  clients: Client[],
  clientResult: (client: Client) => void,
  className?: string | undefined
}
export function ClientSelectList({ clients, clientResult, className }: ClientSelectListProps) {
  const [clientID, setClientID] = useState<string>("");
  useEffect(() => {
    const client = clients.find((client) => client._id === clientID);
    if (client)
      clientResult(client)
  }, [clientID]);

  return (
    <>
      {
        clients.length > 0 ? (
          <select
            name="client"
            id="client"
            required
            onChange={(e) => { setClientID(e.target.value) }}
            className={className} 
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>{client.rif} - {client.name}</option>
            ))}
          </select>
        ) : (
          <p className="text-red-500">Lista de clientes vacia</p>
        )
      }
    </>
  )
}