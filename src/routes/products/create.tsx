import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Product, emptyProduct } from "../../interfaces/Product"
import { FormEvent, useRef, useState } from 'react';
import { AvoidEnterKeyPress } from '../../utils/AvoidEnterKeyPress';
import { useProductsStore } from '../../store/productStore';

export const Route = createFileRoute('/products/create')({
  component: CreateProduct
})

function CreateProduct() {
  const [newProduct, setNewProduct] = useState<Product>(emptyProduct);

  const createProduct = useProductsStore(state => state.createProduct)
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const updateInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'quantity' ? Number(value) : value
    });

  };

  const createProductHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await createProduct(newProduct);
    //Redirecting user to products page
    if (response.success) {
      if (formRef.current)
        formRef.current.reset();

      navigate({ to: "/products" });
    } else {
      // Handle error
      console.error('Failed to update product');
    }
  }//createProductHandler

  return (
    <div className='createProduct'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Agregar producto nuevo</h2>
          <form ref={formRef} onSubmit={createProductHandler} onKeyDown={AvoidEnterKeyPress}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
              <input required type="text" id="name" name="name" placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Cantidad*</label>
              <input required min={0} type="number" step={0.01} id="quantity" name="quantity" placeholder="Enter quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio*</label>
              <input required min={0} type="number" step="0.01" id="price" name="price" placeholder="Enter price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea name="description" rows={4} id="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}