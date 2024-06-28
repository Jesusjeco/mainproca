import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { deletePurchaseOrderById, fetchAllPurchaseOrders } from "../../apiCalls/purchaseOrders"
import "./purchaseOrders.pcss"
import { PurchaseOrder } from "../../interfaces/PurchaseOrder"
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useEffect, useState } from 'react';
import { DMYdate } from '../../utils/dates';
import { fetchClientsIdsAndNames } from '../../apiCalls/clients';
import { ClientIdAndName } from '../../interfaces/Client';

export const Route = createFileRoute('/purchaseOrders/')({
  loader: fetchAllPurchaseOrders,
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="PurchaseOrdere no encontrado" />,
  component: PurchaseOrders,
})

function PurchaseOrders() {
  const allPurchaseOrders = Route.useLoaderData<PurchaseOrder[]>();
  const navigate = useNavigate();
  const [clientIdsAndNames, setClientIdsAndNames] = useState<ClientIdAndName[]>([]);

  const deletePurchaseOrderHandler = async (purchaseOrderId: string) => {
    const response = await deletePurchaseOrderById(purchaseOrderId);

    if (response?.status === 200) {
      navigate({ to: "/purchaseOrders" });
    }
  }

  useEffect(() => {
    const callFetchClientsIdsAndNames = async () => {
      var clientNamesIds = allPurchaseOrders.map((order) => order.client);

      const clientsIdsAndNames = await fetchClientsIdsAndNames(clientNamesIds);
      console.log(clientsIdsAndNames);

      setClientIdsAndNames(clientsIdsAndNames);
    }

    callFetchClientsIdsAndNames();
  }, [allPurchaseOrders]);

  const getClientNameById = (id: string) => {
    const client = clientIdsAndNames.find(client => client.id === id);
    return client ? client.name : 'Unknown Client';
  };

  return (
    <section id='purchaseOrders'>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">PurchaseOrderes</h2>
            <Link to='/purchaseOrders/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar purchaseOrdere</Link>
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
                  allPurchaseOrders && allPurchaseOrders.length > 0 ?
                    allPurchaseOrders.map((purchaseOrder, index) =>
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {getClientNameById(purchaseOrder.client)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {DMYdate(purchaseOrder.orderDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Productos</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {purchaseOrder.totalPrice}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-4">
                            <Link to={'/products/' + purchaseOrder._id} className="text-blue-500 hover:text-blue-700">
                              <FaEye />
                            </Link>
                            <Link to={'/products/edit/' + purchaseOrder._id} className="text-green-500 hover:text-green-700">
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
                    :
                    allPurchaseOrders ?
                      <tr>
                        <td colSpan={4}>Lista de purchaseOrderes vacia</td>
                      </tr>
                      :
                      <tr>
                        <td colSpan={4}>Error en el servidor</td>
                      </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}