import { Link, createFileRoute } from '@tanstack/react-router';
import { Product } from "../../interfaces/Product";
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import ProductRecentSellOrder from '../../components/products/ProductRecentSellOrder';
import ProductRecentPurchaseOrder from '../../components/products/ProductRecentPurchaseOrder';

interface SingleProductProps {
  productId: string;
}

export const Route = createFileRoute('/products/$productId')({
  loader: ({ params }: { params: SingleProductProps }) => params.productId,
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Producto no encontrado" />,
  component: SingleProduct,
});

function SingleProduct() {
  const productId = Route.useLoaderData() as string;
  const loadingProducts = useProductsStore(state => state.loading);
  const getProductById = useProductsStore(state => state.getProductById);

  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProductById(productId);
      setProduct(productData);
    };
    fetchData();
  }, [getProductById, productId]);

  return (
    <>
      {loadingProducts && !product ? (
        <LoadingComponent var1={loadingProducts} />
      ) : product ? (
        <div className="bg-gray-100 min-h-screen">
          <div className="w-full lg:w-4/5 mx-auto bg-white p-4 rounded-lg shadow-lg">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">Detalles de producto</h2>
              <div className="flex space-x-4">
                <Link to={'/products/edit/' + product._id} className="text-green-500 hover:text-green-700">
                  <FaEdit aria-label="Edit product" />
                </Link>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Producto</label>
              <div className="mt-1">
                <p id="name" className="text-lg font-semibold text-gray-900">{product.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</label>
                <div className="mt-1">
                  <p id="quantity" className="text-lg font-semibold text-gray-900">{product.quantity.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                <div className="mt-1">
                  <p id="price" className="text-lg font-semibold text-gray-900">{product.price}</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
              <div className="mt-1">
                <p id="description" className="text-sm text-gray-800">{product.description}</p>
              </div>
            </div>
          </div>

          <ProductRecentSellOrder productId={productId} />
          <ProductRecentPurchaseOrder productId={productId} />
        </div>
      ) : (
        <h1>Producto no encontrado</h1>
      )}
    </>
  );
}
