import { useEffect, useState } from "react";
import { SellOrder } from "../../interfaces/SellOrder";
import { Link } from "@tanstack/react-router";
import { Client } from "../../interfaces/Client";
import { useClientsStore } from "../../store/clientStore";
import { DMYdate } from "../../utils/dates";
import { FaEye } from "react-icons/fa";

interface SellOrderByOrderProps {
  sellOrder: SellOrder;
}
export default function SellOrderByOrder({ sellOrder }: SellOrderByOrderProps) {
  const [client, setClient] = useState<Client | undefined>(undefined)

  const getClientById = useClientsStore(state => state.getClientById);
  useEffect(() => {
    const fetchData = async () => {
      setClient(await getClientById(sellOrder.client_id))
    }
    fetchData()
  }, [sellOrder])
  return (
    <>
      {sellOrder ?
        <>
          <div className="flex items-center gap-4">
            <div>
              <Link to={'/sellOrders/' + sellOrder._id} className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                <FaEye />Ver orden
              </Link>
            </div>
            <div className=" whitespace-nowrap text-sm font-medium text-gray-900">
              {client ? client.name : 'Cliente no encontrado'}
            </div>
            <div className=" whitespace-nowrap text-sm font-medium text-gray-900">
              Fecha: {DMYdate(sellOrder.orderDate)}</div>
          </div>
          <hr className="my-2" />
        </>
        : ""}
    </>
  )
}