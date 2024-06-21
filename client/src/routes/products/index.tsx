import { Link, createFileRoute } from '@tanstack/react-router'
import { fetchAllProducts } from "../../apiCalls/products"
import "./products.pcss"
import { Product } from "../../interfaces/Product"

export const Route = createFileRoute('/products/')({
  loader: fetchAllProducts,
  component: Products,
})

function Products() {
  const allProducts = Route.useLoaderData<Product[]>()

  return (
    <section id='products'>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Inventario</h2>
            <Link to='/products/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar producto</Link>
          </div>

          <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  allProducts.length > 1 ?
                    allProducts.map((product, index) =>
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link to={'/products/' + product._id}>{product.name}</Link></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                      </tr>
                    )
                    : "No hay productos en inventario"
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}