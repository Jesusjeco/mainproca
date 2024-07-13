import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { deleteSellOrderById, fetchAllSellOrders } from "../../apiCalls/sellOrders";
import "./sellOrders.pcss";
import { SellOrder } from "../../interfaces/SellOrder";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useEffect } from 'react';
import { DMYdate } from '../../utils/dates';
import { useClientsStore } from '../../store/clientStore';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';

export const Route = createFileRoute('/sellOrders/')({
  loader: fetchAllSellOrders,
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Purchase Order no encontrado" />,
  component: SellOrders,
});

function SellOrders() {
  const allSellOrders = Route.useLoaderData<SellOrder[]>();
  const navigate = useNavigate();

  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const getClientById = useClientsStore(state => state.getClientById);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const getProductById = useProductsStore(state => state.getProductById);
  const productsLoading = useProductsStore(state => state.loading);

  const deleteSellOrderHandler = async (sellOrderId: string) => {
    const response = await deleteSellOrderById(sellOrderId);

    if (response?.status === 200) {
      navigate({ to: "/sellOrders" });
    }
  };

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);


  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <section id='sellOrders'>
        <div className="bg-gray-100">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Ordenes de compra</h2>
                <p>Ordenes que se agregan al inventario</p>
              </div>
              <Link to='/sellOrders/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar orden de compra</Link>
            </div>

            <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio total</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    allSellOrders && allSellOrders.length > 0 ?
                      allSellOrders.map((sellOrder, index) => {
                        const client = getClientById(sellOrder.client);
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {client ? client.name : 'Cliente no encontrado'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {DMYdate(sellOrder.orderDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {sellOrder.products.map((product, index2) => {
                                const productDetails = getProductById(product.product_id);
                                return (
                                  <div key={index2}>
                                    {productDetails ? productDetails.name : 'Producto no encontrado'} x {product.quantity}
                                  </div>
                                );
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {sellOrder.totalPrice}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-4">
                                <Link to={'/sellOrders/' + sellOrder._id} className="text-blue-500 hover:text-blue-700">
                                  <FaEye />
                                </Link>
                                <Link to={'/sellOrders/edit/' + sellOrder._id} className="text-green-500 hover:text-green-700">
                                  <FaEdit />
                                </Link>
                                <button
                                  onClick={() => { if (sellOrder._id) deleteSellOrderHandler(sellOrder._id) }} className="text-red-500 hover:text-red-700">
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                      :
                      allSellOrders ?
                        <tr>
                          <td colSpan={5}>Lista de órdenes de compra vacía</td>
                        </tr>
                        :
                        <tr>
                          <td colSpan={5}>Error en el servidor</td>
                        </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
