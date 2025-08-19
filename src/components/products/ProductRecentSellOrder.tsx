import { useEffect, useState } from "react"
import { useSellOrdersStore } from "../../store/sellOrderStore"
import { SellOrder } from "../../interfaces/SellOrder"
import SellOrderByOrder from "../sellOrder/SellOrderByOrder"
import { LoadingComponent } from "../LoadingComponent"

interface ProductRecentSellOrderProps {
  productId: string
}

export default function ProductRecentSellOrder({ productId }: ProductRecentSellOrderProps) {
  const getSellOrderByProductID = useSellOrdersStore(state => state.getSellOrderByProductID)
  const [orders, setOrders] = useState<SellOrder[] | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const limit = 5

  const fetchOrders = async (page: number) => {
    setLoading(true)
    try {
      const result = await getSellOrderByProductID(productId, page, limit)
      if (result) {
        setOrders(result.sellOrders)
        setTotalPages(result.totalPages)
        setCurrentPage(result.currentPage)
      } else {
        setOrders([])
        setTotalPages(0)
      }
    } catch (error) {
      console.error("Error fetching sell orders:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchOrders(newPage)
    }
  }

  useEffect(() => {
    fetchOrders(1)
  }, [productId, getSellOrderByProductID])

  return (
    <div className="w-full lg:w-4/5 mx-auto bg-white p-4 rounded-lg shadow-lg mt-4">
      <p className="text-2xl font-bold text-gray-800 mb-2">
        Ordenes de venta recientes
      </p>

      {loading ? (
        <LoadingComponent var1={loading} />
      ) : orders && orders.length > 0 ? (
        <>
          {orders.map((order) =>
            <div key={order._id} className="order">
              <SellOrderByOrder sellOrder={order} />
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`font-bold py-2 px-4 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-500 hover:bg-gray-700 text-white"
                }`}
              >
                Anterior
              </button>
              <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`font-bold py-2 px-4 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-500 hover:bg-gray-700 text-white"
                }`}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600">Este producto no ha sido usado en una órden de venta</p>
      )}
    </div>
  )
}