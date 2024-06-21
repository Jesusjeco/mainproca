import { createFileRoute } from '@tanstack/react-router'
import { Product, ApiResponse } from "../../interfaces/Product"
import { createProduct } from '../../apiCalls/products';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/products/create')({
  component: CreateProduct
})

function CreateProduct() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const createProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      quantity: { value: string };
      description: { value: string };
    };

    const newProduct: Product = {
      name: target.name.value,
      quantity: Number(target.quantity.value),
    };

    const response = await createProduct(newProduct);
    setApiResponse(response);
    if (formRef.current)
      formRef.current.reset(); // Reset the form after submission
  }


  return (
    <div className='createProduct'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Agregar producto nuevo</h2>
          <form ref={formRef} onSubmit={createProductHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
              <input required type="text" id="name" name="name" placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Cantidad*</label>
              <input required min={0} type="number" id="quantity" name="quantity" placeholder="Enter quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea name="description" rows={4} id="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </div>
          </form>
          {apiResponse && (
            <div>
              {apiResponse.success ?
                <div>Producto agregado a inventario</div>
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