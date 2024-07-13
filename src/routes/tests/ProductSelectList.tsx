import { createFileRoute } from '@tanstack/react-router'
import { ProductSelectList } from '../../components/products/ProductSelectList'
import { useProductsStore } from '../../store/productStore'
import { useEffect, useState } from 'react'
import { emptyProduct, Product } from '../../interfaces/Product'

export const Route = createFileRoute('/tests/ProductSelectList')({
  component: index
})

function index() {
  const fetchProducts = useProductsStore(state => state.fetchProducts)
  const products = useProductsStore(state => state.products)
  const [product, setProduct] = useState<Product>(emptyProduct)
  const productResult = (newProduct: Product) => {
    setProduct(newProduct);
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <h2>ProductSelectList</h2>
      <div>Current Product: {product.name}</div>
      <ProductSelectList products={products} productResult={productResult} className="w-full border border-gray-300 rounded-md p-2" />
    </>
  )
}