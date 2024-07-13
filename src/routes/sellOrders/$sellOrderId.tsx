import { createFileRoute } from '@tanstack/react-router'
import { fetchSellOrderById } from '../../apiCalls/sellOrders'
import { SellOrder } from "../../interfaces/SellOrder"
import { useEffect, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { DMYdate } from '../../utils/dates';
import { useClientsStore } from '../../store/clientStore';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { Client, emptyClient } from '../../interfaces/Client';

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

  const [client, setClient] = useState<Client>(emptyClient);

  useEffect(() => {
    fetchClients();
    fetchProducts();

    const setClientHandler = () => {
      const client = getClientById(sellOrder.client);
      if (client)
        setClient(client);
    }
    setClientHandler();

  }, []);

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <div className="w-full lg:w-4/5 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Orden de compra</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="mb-4">
            <p className="block text-gray-700 font-medium mb-2">Cliente</p>
            <p className="w-full border border-gray-300 rounded-md p-2">
              {client.rif} - {client.name}
            </p>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="orderDate" className="block text-gray-700 font-medium mb-2">Fecha de orden</label>
            <div className="w-full border border-gray-300 rounded-md p-2">{DMYdate(sellOrder.orderDate)}</div>
          </div>
        </div>


        <div className="mb-4">
          <p className="block text-gray-700 font-medium mb-2">Dirección</p>
          <p>{sellOrder.address}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-6 inline">Productos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Productos</th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Precio</th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Cantidad</th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  sellOrder.products.map((product, index) =>
                    <tr key={index} className="py-2 px-4 border-b border-gray-300">
                      <td >{getProductById(product.product_id)?.name + " x " + product.quantity}
                      </td>
                      <td id="price" className=" border border-gray-300 rounded-md p-2 pr-10">
                        {product.price}
                        <span className="text-gray-500">$</span>
                      </td>
                      <td className="border border-gray-300 rounded-md p-2">{product.quantity}</td>
                      <td>{product.price * product.quantity}</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4">
          <div className="block text-gray-700 font-medium mb-2 text-right">Precio total*</div>
          <p id="totalPrice" className="w-full border border-gray-300 rounded-md p-2 text-right">{sellOrder.totalPrice}</p>
        </div>
      </div>
    </>
  )
}