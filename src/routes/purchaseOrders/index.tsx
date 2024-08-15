import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import "./purchaseOrders.pcss";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useState } from 'react';
import { DMYdate } from '../../utils/dates';
import { useClientsStore } from '../../store/clientStore';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { usePurchaseOrdersStore } from '../../store/purchaseOrderStore';

export const Route = createFileRoute('/purchaseOrders/')({
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Purchase Order no encontrado" />,
  component: PurchaseOrders,
});

function PurchaseOrders() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Using Zustand Purchase Order store
  const fetchPurchaseOrders = usePurchaseOrdersStore(state => state.fetchPurchaseOrders)
  const purchaseOrders = usePurchaseOrdersStore(state => state.purchaseOrders)
  const purchaseOrdersLoading = usePurchaseOrdersStore(state => state.loading)
  const totalPages = usePurchaseOrdersStore(state => state.totalPages);
  const deletePurchaseOrderById = usePurchaseOrdersStore(state => state.deletePurchaseOrderById)

  // Using Zustand Client store
  const getFetchedClientById = useClientsStore(state => state.getFetchedClientById);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const getFetchedProductById = useProductsStore(state => state.getFetchedProductById);
  const productsLoading = useProductsStore(state => state.loading);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchPurchaseOrders(newPage);
  };

  const deletePurchaseOrderHandler = async (purchaseOrderId: string) => {
    if (window.confirm('¿Seguro quieres borrar esta orden?')) {
      const response = await deletePurchaseOrderById(purchaseOrderId);
      if (response.success) {
        navigate({ to: "/purchaseOrders" });
      } else {
        alert('Failed to delete sell order');
      }
    }
  };
  //deletePurchaseOrderHandler

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} var3={purchaseOrdersLoading} />
      <section id='purchaseOrders'>
        <div className="bg-gray-100">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Compras</h2>
              </div>
              <Link to='/purchaseOrders/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrar compra</Link>
            </div>

            <div className="overflow-x-auto border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factura</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    purchaseOrders && purchaseOrders.length > 0 ?
                      purchaseOrders.map((purchaseOrder, index) => {
                        const client = getFetchedClientById(purchaseOrder.client_id);
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {DMYdate(purchaseOrder.orderDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {purchaseOrder.orderNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <Link to={'/purchaseOrders/' + purchaseOrder._id} >
                                {client ? client.name : 'Cliente no encontrado'}
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {purchaseOrder.productsOrder.map((product, index2) => {
                                const productDetails = getFetchedProductById(product.product_id);
                                return (
                                  <div key={index2}>
                                    {productDetails ? productDetails.name : 'Producto no encontrado'}
                                  </div>
                                );
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-4">
                                <Link to={'/purchaseOrders/' + purchaseOrder._id} className="text-blue-500 hover:text-blue-700">
                                  <FaEye />
                                </Link>
                                <Link to={'/purchaseOrders/edit/' + purchaseOrder._id} className="text-green-500 hover:text-green-700">
                                  <FaEdit />
                                </Link>
                                <button
                                  onClick={() => { if (purchaseOrder._id) deletePurchaseOrderHandler(purchaseOrder._id) }} className="text-red-500 hover:text-red-700">
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                      :
                      purchaseOrders ?
                        <tr>
                          <td colSpan={5}>Lista de compras vacía</td>
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
