import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PurchaseOrder, PurchaseOrderApiResponse, emptyPurchaseOrder } from "../../interfaces/PurchaseOrder"
import { createPurchaseOrder } from '../../apiCalls/purchaseOrders';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/purchaseOrders/create')({
  component: CreatePurchaseOrder
})

function CreatePurchaseOrder() {
  const [apiResponse, setApiResponse] = useState<PurchaseOrderApiResponse | null>(null);
  const [newPurchaseOrder, setNewPurchaseOrder] = useState<PurchaseOrder>(emptyPurchaseOrder);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const updateInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPurchaseOrder({
      ...newPurchaseOrder,
      [name]: value
    });

  };

  const createPurchaseOrderHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await createPurchaseOrder(newPurchaseOrder);
    setApiResponse(response);

    // Reset the form after submission
    if (formRef.current)
      formRef.current.reset();

    //Redirecting user to purchaseOrders page
    if (response.success) {
      navigate({ to: "/purchaseOrders" });
    } else {
      // Handle error
      console.error('Failed to update purchaseOrder');
    }
  }

  return (
    <div className='createPurchaseOrder'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Agregar Orden de compra nueva</h2>
          <form ref={formRef} onSubmit={createPurchaseOrderHandler}>

            <div className="mb-4">
              <label htmlFor="client" className="block text-gray-700 text-sm font-bold mb-2">client*</label>
              <input required type="text" id="client" name="client" placeholder="Enter your client" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="products" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
              <input required type="text" id="products" name="products" placeholder="Enter your products" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="totalPrice" className="block text-gray-700 text-sm font-bold mb-2">Dirección fiscal*</label>
              <input required min={0} type="number" name="totalPrice" id="totalPrice" onChange={updateInputHandler} />
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Crear
              </button>
            </div>
          </form>
          {apiResponse && (
            <div>
              {apiResponse.success ?
                <div>PurchaseOrdere agregado a inventario</div>
                :
                <div>Error: {apiResponse.message}</div>
              }
              {/* {apiResponse.data && (
                <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}