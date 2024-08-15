import { useEffect, useState } from "react"
import { PurchaseOrder } from "../../interfaces/PurchaseOrder"
import { usePurchaseOrdersStore } from "../../store/purchaseOrderStore"
import PurchaseOrderByOrder from "../purchaseOrder/PurchaseOrderByOrder"

interface ClientRecentPurchaseOrderProps {
  clientId: string
}

export default function ClientRecentPurchaseOrder({ clientId }: ClientRecentPurchaseOrderProps) {
  const getPurchaseOrderByClientID = usePurchaseOrdersStore(state => state.getPurchaseOrderByClientID)
  const [orders, setOrders] = useState<PurchaseOrder[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      setOrders(await getPurchaseOrderByClientID(clientId))
    }
    fetchData()
  }, [clientId])
  return (
    <div className="w-full lg:w-4/5 mx-auto bg-white p-4 rounded-lg shadow-lg mt-4">
      <p className="text-2xl font-bold text-gray-800 mb-2">
        Facturas de compra recientes
      </p>

      {orders && orders.length > 0 ?
        orders.map((order, index) =>
          <div key={index} className="order">
            <PurchaseOrderByOrder purchaseOrder={order} />
          </div>
        )
        : "Este producto no ha sido usado en una órden de venta"}
    </div>
  )
}