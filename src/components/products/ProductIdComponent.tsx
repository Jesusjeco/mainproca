import { useEffect, useState } from "react"
import { useProductsStore } from "../../store/productStore"

interface ProductIdComponentProps {
  productIdResult: (newProductId: string | undefined) => void;
  initialProductId?: string | undefined;
}
export function ProductIdComponent({ productIdResult, initialProductId }: ProductIdComponentProps) {
  useEffect(() => {
    if (initialProductId)
      setProductId(initialProductId)
  }, [initialProductId])
  const fetchProducts = useProductsStore(state => state.fetchProducts)
  const products = useProductsStore(state => state.products)
  useEffect(() => {
    async function fetchData() {
      try {
        await fetchProducts()
      } catch (error) {
        console.log("error: " + error);

      }
    }
    fetchData()
  }, [])

  const [productId, setProductId] = useState<string | undefined>(undefined)
  useEffect(() => {
    productIdResult(productId)
  }, [productId])
  return (
    <div>
      <label htmlFor="product" className="block text-gray-700 font-bold mb-2">Producto*</label>
      {products.length > 0 ?
        <select required name="product" id="product"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select a product</option>
          {products.map((product, index) =>
            <option key={index} value={product._id}>{product.name}</option>
          )}
        </select>
        : "Lista de productos vacia"}
    </div>
  )
}