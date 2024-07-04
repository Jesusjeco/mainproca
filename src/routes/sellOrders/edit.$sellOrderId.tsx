import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { editSellOrderById, fetchSellOrderById } from '../../apiCalls/sellOrders'
import { SellOrder } from "../../interfaces/SellOrder"
import { useEffect, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent'
import { NotFoundComponent } from '../../components/NotFoundComponent'
import { DMYdate } from '../../utils/dates'

export const Route = createFileRoute('/sellOrders/edit/$sellOrderId')({
  loader: async ({ params: { sellOrderId } }) => fetchSellOrderById(sellOrderId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="SellOrdere no encontrado" />,
  component: EditSellOrder
})

function EditSellOrder() {
  const sellOrder = Route.useLoaderData<SellOrder>()
  const [newSellOrder, setNewSellOrder] = useState<SellOrder>(sellOrder)
  const navigate = useNavigate();

  const modifySellOrderHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await editSellOrderById(newSellOrder);
    if (response.success) {
      navigate({ to: "/sellOrders/" + newSellOrder._id });
    } else {
      // Handle error
      console.error('Failed to update sellOrder');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSellOrder({
      ...newSellOrder,
      [name]: value
    });
  };

  useEffect(() => {
    setNewSellOrder(sellOrder);
  }, [sellOrder]);

  return (
    <div className='createSellOrder'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Modificar Orden de compra</h2>
          <form onSubmit={modifySellOrderHandler}>

            <div className="mb-4">
              <label htmlFor="client" className="block text-gray-700 text-sm font-bold mb-2">Cliente*</label>
              <input required type="text" id="client" name="client" placeholder="Enter your client" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newSellOrder.client}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="orderDate" className="block text-gray-700 text-sm font-bold mb-2">Fecha*</label>
              <input required disabled type="text" id="orderDate" name="orderDate" placeholder="Enter your orderDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={DMYdate(sellOrder.orderDate)}
              //onChange={handleInputChange}
              />
            </div>


            <div className="mb-4">
              <label htmlFor="product" className="block text-gray-700 text-sm font-bold mb-2">Productos</label>
              <textarea name="product" rows={4} id="product" placeholder="Enter product" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newSellOrder.products.map((product) => product.product)}
              >
                {newSellOrder.products.map((product, index) =>
                  <div key={index}>{product.product + " x " + product.quantity}</div>
                )}</textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="totalPrice" className="block text-gray-700 text-sm font-bold mb-2">Precio total</label>
              <input required min={0} type='number' step="0.01" name="totalPrice" id="totalPrice" placeholder="Enter totalPrice" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newSellOrder.totalPrice}
              ></input>
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