import { useEffect, useState } from "react"
import { useSellOrdersStore } from "../../store/sellOrderStore"
import { SellOrder } from "../../interfaces/SellOrder"
import SellOrderByOrder from "../sellOrder/SellOrderByOrder"

interface ProductRecentSellOrderProps {
  productID: string
}

export default function ProductRecentSellOrder({ productID }: ProductRecentSellOrderProps) {
  const getSellOrderByProductID = useSellOrdersStore(state => state.getSellOrderByProductID)
  const [orders, setOrders] = useState<SellOrder[] | undefined>(undefined)

  useEffect(() => {
    if (productID)
      setOrders(getSellOrderByProductID(productID))
  }, [productID])
  return (
    <div className="w-full lg:w-4/5 mx-auto bg-white p-4 rounded-lg shadow-lg mt-4">
      <p className="text-2xl font-bold text-gray-800 mb-2">
        Ordenes de compra recientes
      </p>

      {orders && orders.length > 0 ?
        orders.map((order,index) =>
          <div key={index} className="order">
            <SellOrderByOrder sellOrder={order} />
          </div>
        )
        : "Este producto no ha sido usado en una órden de venta"}
    </div>
  )
}