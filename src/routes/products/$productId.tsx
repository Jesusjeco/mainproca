import { Link, createFileRoute } from '@tanstack/react-router'
import { fetchProductById } from '../../apiCalls/products'
import { Product } from "../../interfaces/Product"
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';

export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params: { productId } }) => fetchProductById(productId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Producto no encontrado" />,
  component: SingleProduct
})

function SingleProduct() {
  const productData = Route.useLoaderData<Product>()
  const [product, setProduct] = useState<Product>(productData);

  useEffect(() => { setProduct(productData) }, [productData]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="min-w-1/2 md:min-w-0 lg:min-w-0 w-full md:w-1/2 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Producto</label>
          <div className="mt-1">
            <p id="name" className="text-lg font-semibold text-gray-900">{product.name}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</label>
          <div className="mt-1">
            <p id="quantity" className="text-lg font-semibold text-gray-900">{product.quantity}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
          <div className="mt-1">
            <p id="price" className="text-lg font-semibold text-gray-900">{product.price}</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <div className="mt-1">
            <p id="description" className="text-sm text-gray-800">{product.description}</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <Link to={'/products/edit/' + product._id} className="text-green-500 hover:text-green-700">
            <FaEdit />
          </Link>
        </div>
      </div>
    </div>
  )
}