import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import "./products.pcss"
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/products/')({
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Producto no encontrado" />,
  component: Products,
})

function Products() {
  const products = useProductsStore(state => state.products)
  const loadingProducts = useProductsStore(state => state.loading)
  const deleteProductById = useProductsStore(state => state.deleteProductById)

  const [totalInventoryCost, setTotalInventoryCost] = useState(0.00);
  useEffect(() => {
    const priceQuantity = products.map(product => product.price * product.quantity)
    const total = priceQuantity.reduce((acumulator, currentValue) => acumulator + currentValue, 0)
    setTotalInventoryCost(total)
  }, [products])

  const navigate = useNavigate();

  const deleteProductHandler = async (productId: string) => {
    if (window.confirm('¿Seguro quieres borrar este producto?')) {
      const response = await deleteProductById(productId);
      if (response.success) {
        navigate({ to: "/products" });
      } else {
        console.log("Error when deleting product");
      }
    }
  }//deleteProductHandler

  return (
    <>
      <LoadingComponent var1={loadingProducts} />
      <section id='products'>
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Inventario</h2>
              <Link to='/products/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar producto</Link>
            </div>

            <div className="overflow-x-auto border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo inventario</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    products && products.length > 0 ?
                      products.map((product, index) =>
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <Link to={'/products/' + product._id}>{product.name}</Link></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(product.price).toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(product.quantity).toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(product.price * product.quantity).toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-4">
                              <Link to={'/products/' + product._id} className="text-blue-500 hover:text-blue-700">
                                <FaEye aria-label="View product" />
                              </Link>
                              <Link to={'/products/edit/' + product._id} className="text-green-500 hover:text-green-700">
                                <FaEdit aria-label="Edit product" />
                              </Link>
                                <button
                                  onClick={() => { if (product._id) deleteProductHandler(product._id) }} className="text-red-500 hover:text-red-700">
                                  <FaTrashAlt aria-label="Delete product" />
                                </button>
                            </div>
                          </td>
                        </tr>
                      )
                      :
                      products ?
                        <tr>
                          <td colSpan={5}>No hay productos en inventario</td>
                        </tr>
                        :
                        <tr>
                          <td colSpan={5}>Error en el servidor</td>
                        </tr>
                  }
                </tbody>
              </table>
              <div>
                <p>Precio total del inventario: {totalInventoryCost.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
