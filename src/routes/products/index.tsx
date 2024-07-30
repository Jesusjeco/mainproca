import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import "./products.pcss"
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useProductsStore } from '../../store/productStore';
import { useEffect } from 'react';
import { LoadingComponent } from '../../components/LoadingComponent';

export const Route = createFileRoute('/products/')({
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Producto no encontrado" />,
  component: Products,
})

function Products() {
  const fetchProducts = useProductsStore(state => state.fetchProducts)
  const products = useProductsStore(state => state.products)
  const loadingProducts = useProductsStore(state => state.loading)
  const deleteProductById = useProductsStore(state => state.deleteProductById)
  const setLoading = useProductsStore(state => state.setLoading)
  useEffect(() => {
    fetchProducts()
  }, []);
  const navigate = useNavigate();

  const deleteProductHandler = async (productId: string) => {
    setLoading(true);
    const response = await deleteProductById(productId);
    if (response.success) {
      setLoading(false);
      navigate({ to: "/products" });
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

            <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-4">
                              <Link to={'/products/' + product._id} className="text-blue-500 hover:text-blue-700">
                                <FaEye />
                              </Link>
                              <Link to={'/products/edit/' + product._id} className="text-green-500 hover:text-green-700">
                                <FaEdit />
                              </Link>
                              <button
                                onClick={() => { if (product._id) deleteProductHandler(product._id) }} className="text-red-500 hover:text-red-700">
                                <FaTrashAlt />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                      :
                      products ?
                        <tr>
                          <td colSpan={3}>No hay productos en inventario</td>
                        </tr>
                        :
                        <tr>
                          <td colSpan={3}>Error en el servidor</td>
                        </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}