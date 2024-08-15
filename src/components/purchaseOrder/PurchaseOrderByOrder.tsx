import { useEffect, useState } from "react";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { Link } from "@tanstack/react-router";
import { Client } from "../../interfaces/Client";
import { useClientsStore } from "../../store/clientStore";
import { DMYdate } from "../../utils/dates";
import { FaEye } from "react-icons/fa";
import { LoadingComponent } from "../LoadingComponent";

interface PurchaseOrderByOrderProps {
  purchaseOrder: PurchaseOrder;
}
export default function PurchaseOrderByOrder({ purchaseOrder }: PurchaseOrderByOrderProps) {
  const [client, setClient] = useState<Client | undefined>(undefined)

  const getClientById = useClientsStore(state => state.getClientById);
  const clientLoading = useClientsStore(state => state.loading);
  useEffect(() => {
    const fetchData = async () => {
      if (purchaseOrder)
        setClient(await getClientById(purchaseOrder.client_id))
    }//fetchData
    fetchData()
  }, [getClientById, purchaseOrder])
  return (
    <>
      {clientLoading && !purchaseOrder && !client ? (
        <LoadingComponent var1={clientLoading} />
      ) : (purchaseOrder && client) ? (
        <>
          <div className="flex items-center gap-4">
            <div>
              <Link to={'/purchaseOrders/' + purchaseOrder._id} className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                <FaEye />Ver orden
              </Link>
            </div>
            <div className=" whitespace-nowrap text-sm font-medium text-gray-900">
              {client ? client.name : 'Cliente no encontrado'}
            </div>
            <div className=" whitespace-nowrap text-sm font-medium text-gray-900">
              Fecha: {DMYdate(purchaseOrder.orderDate)}</div>
          </div>
          <hr className="my-2" />
        </>
      ) : ""
      }
    </>
  )
}