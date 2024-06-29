import { Link, createFileRoute } from '@tanstack/react-router'
import { fetchPurchaseOrderById } from '../../apiCalls/purchaseOrders'
import { PurchaseOrder } from "../../interfaces/PurchaseOrder"
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { DMYdate } from '../../utils/dates';

export const Route = createFileRoute('/purchaseOrders/$purchaseOrderId')({
  loader: async ({ params: { purchaseOrderId } }) => fetchPurchaseOrderById(purchaseOrderId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="PurchaseOrdere no encontrado" />,
  component: SinglePurchaseOrder
})

function SinglePurchaseOrder() {
  const purchaseOrderData = Route.useLoaderData<PurchaseOrder>()
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(purchaseOrderData);

  useEffect(() => { setPurchaseOrder(purchaseOrderData) }, [purchaseOrderData]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className=" w-fullbg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Orden de venta</h2>
        <div className="mb-4">

          <div className="mt-1">
            <p id="id" className="text-lg font-semibold text-gray-900">ID: {purchaseOrder._id}</p>
          </div>

          <div className="mt-1">
            <p id="client_name" className="text-lg font-semibold text-gray-900">Cliente: {purchaseOrder.client}</p>
          </div>

          <div className="mt-1">
            <p id="date" className="text-lg font-semibold text-gray-900">Fecha: {DMYdate(purchaseOrder.orderDate)}</p>
          </div>

          <div className="mt-1">
            <p id="price" className="text-lg font-semibold text-gray-900">Productos: {purchaseOrder.products.map((product) => product.product)}</p>
          </div>

          <div className="mt-1">
            <p id="price" className="text-lg font-semibold text-gray-900">Precio total: {purchaseOrder.totalPrice}</p>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <Link to={'/purchaseOrders/edit/' + purchaseOrder._id} className="text-green-500 hover:text-green-700">
            <FaEdit />
          </Link>
        </div>

      </div>
    </div>
  )
}