import { Link, createFileRoute } from '@tanstack/react-router'
import { fetchSellOrderById } from '../../apiCalls/sellOrders'
import { SellOrder } from "../../interfaces/SellOrder"
import { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { DMYdate } from '../../utils/dates';
import { useClientsStore } from '../../store/clientStore';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';

export const Route = createFileRoute('/sellOrders/$sellOrderId')({
  loader: async ({ params: { sellOrderId } }) => fetchSellOrderById(sellOrderId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="SellOrdere no encontrado" />,
  component: SingleSellOrder
})

function SingleSellOrder() {
  const sellOrder = Route.useLoaderData<SellOrder>()
  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const getClientById = useClientsStore(state => state.getClientById);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const getProductById = useProductsStore(state => state.getProductById);
  const productsLoading = useProductsStore(state => state.loading);

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className=" w-fullbg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Orden de compra</h2>
          <div className="mb-4">

            <div className="mt-1">
              <p id="client_name" className="text-lg font-semibold text-gray-900">
                Cliente: {getClientById(sellOrder.client)?.name}</p>
            </div>

            <div className="mt-1">
              <p id="date" className="text-lg font-semibold text-gray-900">Fecha: {DMYdate(sellOrder.orderDate)}</p>
            </div>

            <div className="mt-1">
              <p id="price" className="text-lg font-semibold text-gray-900">Productos:</p>
              {
                sellOrder.products.map((product, index) =>
                  <div key={index}>{getProductById(product.product)?.name + " x " + product.quantity}</div>
                )}
            </div>

            <div className="mt-1">
              <p id="price" className="text-lg font-semibold text-gray-900">Precio total: {sellOrder.totalPrice} $</p>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <Link to={'/sellOrders/edit/' + sellOrder._id} className="text-green-500 hover:text-green-700">
              <FaEdit />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}