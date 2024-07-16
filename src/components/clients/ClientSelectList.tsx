/*
* this components returns a full client
* based on the selected ID
*/
import { useEffect, useState } from "react"
import { Client, emptyClient } from "../../interfaces/Client"

interface ClientSelectListProps {
  clients: Client[],
  clientResult: (client: Client) => void,
  className?: string | undefined,
  label?: string
}
export function ClientSelectList({ clients, clientResult, className, label = "client_id" }: ClientSelectListProps) {
  const [clientID, setClientID] = useState<string>("");
  useEffect(() => {
    const client = clients.find((client) => client._id === clientID);
    if (client)
      clientResult(client)
    else
      clientResult(emptyClient);
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