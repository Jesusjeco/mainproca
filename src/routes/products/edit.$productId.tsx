import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { editProductById, fetchProductById } from '../../apiCalls/products'
import { Product } from "../../interfaces/Product"
import { useEffect, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent'
import { NotFoundComponent } from '../../components/NotFoundComponent'

export const Route = createFileRoute('/products/edit/$productId')({
  loader: async ({ params: { productId } }) => fetchProductById(productId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Producto no encontrado" />,
  component: EditProduct
})

function EditProduct() {
  const product = Route.useLoaderData<Product>()
  const [newProduct, setNewProduct] = useState<Product>(product)
  const navigate = useNavigate();

  const modifyProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await editProductById(newProduct);
    if (response.success) {
      navigate({ to: "/products/" + newProduct._id });
    } else {
      // Handle error
      console.error('Failed to update product');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: (name === 'quantity' || name === 'price') ? Number(value) : value
    });
  };

  useEffect(() => {
    setNewProduct(product);
  }, [product]);

  return (
    <div className='createProduct'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Modificar producto</h2>
          <form onSubmit={modifyProductHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
              <input required type="text" id="name" name="name" placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Cantidad*</label>
              <input required min={0} type="number" id="quantity" name="quantity" placeholder="Enter quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newProduct.quantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio*</label>
              <input required min={0} type="number" step="0.01" id="price" name="price" placeholder="Enter price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea name="description" rows={4} id="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newProduct.description}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cambiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}