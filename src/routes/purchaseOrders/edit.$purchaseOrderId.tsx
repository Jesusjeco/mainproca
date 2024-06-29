import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { editPurchaseOrderById, fetchPurchaseOrderById } from '../../apiCalls/purchaseOrders'
import { PurchaseOrder } from "../../interfaces/PurchaseOrder"
import { useEffect, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent'
import { NotFoundComponent } from '../../components/NotFoundComponent'
import { DMYdate } from '../../utils/dates'

export const Route = createFileRoute('/purchaseOrders/edit/$purchaseOrderId')({
  loader: async ({ params: { purchaseOrderId } }) => fetchPurchaseOrderById(purchaseOrderId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="PurchaseOrdere no encontrado" />,
  component: EditPurchaseOrder
})

function EditPurchaseOrder() {
  const purchaseOrder = Route.useLoaderData<PurchaseOrder>()
  const [newPurchaseOrder, setNewPurchaseOrder] = useState<PurchaseOrder>(purchaseOrder)
  const navigate = useNavigate();

  const modifyPurchaseOrderHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await editPurchaseOrderById(newPurchaseOrder);
    if (response.success) {
      navigate({ to: "/purchaseOrders/" + newPurchaseOrder._id });
    } else {
      // Handle error
      console.error('Failed to update purchaseOrder');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPurchaseOrder({
      ...newPurchaseOrder,
      [name]: value
    });
  };

  useEffect(() => {
    setNewPurchaseOrder(purchaseOrder);
  }, [purchaseOrder]);

  return (
    <div className='createPurchaseOrder'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Modificar Orden de venta</h2>
          <form onSubmit={modifyPurchaseOrderHandler}>

            <div className="mb-4">
              <label htmlFor="client" className="block text-gray-700 text-sm font-bold mb-2">Cliente*</label>
              <input required type="text" id="client" name="client" placeholder="Enter your client" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newPurchaseOrder.client}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="orderDate" className="block text-gray-700 text-sm font-bold mb-2">Fecha*</label>
              <input required disabled type="text" id="orderDate" name="orderDate" placeholder="Enter your orderDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={DMYdate(purchaseOrder.orderDate)}
              //onChange={handleInputChange}
              />
            </div>


            <div className="mb-4">
              <label htmlFor="product" className="block text-gray-700 text-sm font-bold mb-2">Productos</label>
              <textarea name="product" rows={4} id="product" placeholder="Enter product" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newPurchaseOrder.products.map((product) => product.product)}
              >
                {newPurchaseOrder.products.map((product, index) =>
                  <div key={index}>{product.product + " x " + product.quantity}</div>
                )}</textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="totalPrice" className="block text-gray-700 text-sm font-bold mb-2">Precio total</label>
              <textarea name="totalPrice" rows={4} id="totalPrice" placeholder="Enter totalPrice" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newPurchaseOrder.totalPrice}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cambiar
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}