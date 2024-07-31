import { useEffect, useState } from "react"
import { Client } from "../../interfaces/Client"

interface AddressSelectListProps {
  client: Client,
  selectedAddress: string,
  resultAddress: (newAddress: string) => void;
  label: string,
  className?: string | undefined
}
export function AddressSelectList({ client, selectedAddress = "", resultAddress, label = "address", className }: AddressSelectListProps) {
  const [address, setAddress] = useState<string>(selectedAddress)
  useEffect(() => {
    resultAddress(address)
  }, [address])
  return (
    <>
      {client._id !== "" ?
        <select required name={label} id={label} className={className}
          value={address}
          onChange={(e) => setAddress(e.target.value)}>
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