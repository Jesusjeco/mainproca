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
    if (sellOrder)
      setClient(getClientById(sellOrder.client_id))
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
              <Link to={'/sellOrders/' + sellOrder._id} >
                {client ? client.name : 'Cliente no encontrado'}
              </Link>
            </div>
            <div className=" whitespace-nowrap text-sm font-medium text-gray-900">
              {DMYdate(sellOrder.orderDate)}</div>
          </div>
          <hr className="my-2" />
        </>
        : ""}
    </>
  )
}