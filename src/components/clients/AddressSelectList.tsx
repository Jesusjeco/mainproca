import { useEffect, useState } from "react"
import { Client } from "../../interfaces/Client"

interface AddressSelectListProps {
  client: Client,
  resultAddress: (newAddress: string) => void;
  label: string,
  className?: string | undefined
}
export function AddressSelectList({ client, resultAddress, label = "address", className }: AddressSelectListProps) {
  const [address, setAddress] = useState<string>("")
  useEffect(() => {
    resultAddress(address)
  }, [address])
  return (
    <>
      {client._id !== "" ?
        <select name={label} id={label} className={className} onChange={(e) => setAddress(e.target.value)}>
          <option value="">Elegir direccion de entrega</option>
          <option value={client.legal_address}>{client.legal_address}</option>
          {client.offices.length > 0 ?
            client.offices.map((office, index) =>
              <option key={index} value={office.address}>{office.address}</option>
            )
            : ""
          }
        </select>
        : <div className={className}>Escoger un cliente</div>
      }

    </>
  )
}