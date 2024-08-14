import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import "./sellOrders.pcss";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useState } from 'react';
import { DMYdate } from '../../utils/dates';
import { useClientsStore } from '../../store/clientStore';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { useSellOrdersStore } from '../../store/sellOrderStore';

export const Route = createFileRoute('/sellOrders/')({
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Purchase Order no encontrado" />,
  component: SellOrders,
});

function SellOrders() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Using Zustand Sell Order store
  const fetchSellOrders = useSellOrdersStore(state => state.fetchSellOrders)
  const sellOrders = useSellOrdersStore(state => state.sellOrders)
  const sellOrdersLoading = useSellOrdersStore(state => state.loading)
  const totalPages = useSellOrdersStore(state => state.totalPages);
  const deleteSellOrderById = useSellOrdersStore(state => state.deleteSellOrderById)

  // Using Zustand Client store
  const getClientById = useClientsStore(state => state.getClientById);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const getFetchedProductById = useProductsStore(state => state.getFetchedProductById);
  const productsLoading = useProductsStore(state => state.loading);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchSellOrders(newPage);
  };

  const deleteSellOrderHandler = async (sellOrderId: string) => {
    if (window.confirm('¿Seguro quieres borrar esta orden?')) {
      const response = await deleteSellOrderById(sellOrderId);
      if (response.success) {
        navigate({ to: "/sellOrders" });
      } else {
        alert('Failed to delete sell order');
      }
    }
  };
  //deleteSellOrderHandler

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} var3={sellOrdersLoading} />
      <section id='sellOrders'>
        <div className="bg-gray-100">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Notas de entrega</h2>
              </div>
              <Link to='/sellOrders/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear nota</Link>
            </div>

            <div className="overflow-x-auto border border-gray-200 sm:rounded-lg">
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
                    sellOrders && sellOrders.length > 0 ?
                      sellOrders.map((sellOrder, index) => {
                        const client = getClientById(sellOrder.client_id);
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <Link to={'/sellOrders/' + sellOrder._id} >
                                {client ? client.name : 'Cliente no encontrado'}
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {DMYdate(sellOrder.orderDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {sellOrder.products.map((product, index2) => {
                                const productDetails = getFetchedProductById(product.product_id);
                                return (
                                  <div key={index2}>
                                    {productDetails ? productDetails.name : 'Producto no encontrado'}
                                  </div>
                                );
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {sellOrder.subTotal ? sellOrder.subTotal.toFixed(2) : ""}</td>
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
                      sellOrders ?
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

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Anterior
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Siguiente
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
