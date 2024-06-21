import { createFileRoute, ErrorComponent, ErrorComponentProps } from '@tanstack/react-router'
import { fetchProductById } from '../../apiCalls/products'
import { Product } from "../../interfaces/Product"

export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params: { productId } }) => fetchProductById(productId),
  errorComponent: PostErrorComponent as any,
  notFoundComponent: () => {
    return <p>Producto no encontrado</p>
  },
  component: SingleProduct
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function SingleProduct() {
  const product = Route.useLoaderData<Product>()
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <div className="mt-1">
            <p id="description" className="text-sm text-gray-800">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}