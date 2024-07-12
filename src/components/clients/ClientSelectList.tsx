import { useEffect, useState } from "react"
import { Client } from "../../interfaces/Client"

interface ClientSelectListProps {
  clients: Client[],
  clientResult: (client: Client) => void
}
export function ClientSelectList({ clients, clientResult }: ClientSelectListProps) {
  const [clientID, setClientID] = useState<string>("");
  useEffect(() => {
    const client = clients.find((client) => client._id === clientID);
    if (client)
      clientResult(client)
  }, [clientID]);

  return (
    <>
      <label htmlFor="client" className="block text-gray-700 font-medium mb-2">Client*</label>
      {
        clients.length > 0 ? (
          <select
            name="client"
            id="client"
            required
            onChange={(e) => { setClientID(e.target.value) }}
            className="w-full border border-gray-300 rounded-md p-2"
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