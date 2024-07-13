import { useEffect, useState } from "react";
import { ProductSelectList } from "./ProductSelectList";
import { LoadingComponent } from "../LoadingComponent";
import { useProductsStore } from "../../store/productStore";
import { emptyProduct, Product } from "../../interfaces/Product";
import { emptyClient } from "../../interfaces/Client";

export function ProductOrderTable() {
  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const products = useProductsStore(state => state.products);
  const productsLoading = useProductsStore(state => state.loading);
  useEffect(() => {
    fetchProducts();
  }, []);

  const [product, setProduct] = useState<Product>(emptyProduct);
  const productResult = (newProduct: Product) => {
    setProduct(newProduct)
  }

  const [alternativePrice, setAlternativePrice] = useState<number>(0.00);
  useEffect(() => {
    setAlternativePrice(product.price)
  }, [product]);

  const [quantity, setQuantity] = useState<number>(0)

  const [totalPrice, setTotalPrice] = useState<number>(0.00);
  useEffect(() => {
    setTotalPrice(alternativePrice * quantity)
  }, [alternativePrice, quantity])
  return (
    <>
      <LoadingComponent var1={productsLoading} />
      <div className="grid grid-cols-5 gap-4">
        <div>
          <label htmlFor="product" className="block text-gray-700 font-medium">Producto:</label>
          <ProductSelectList products={products} productResult={productResult} label={"product"} />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 font-medium">Precio:
            <span className="text-sm text-gray-500">(${product.price})</span> </label>
          <input type="number" name="price" id="price" min={0.00} step={0.01}
            className="text-gray-900"
            onChange={(e) => setAlternativePrice(Number(e.target.value))}
            value={alternativePrice} />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-gray-700 font-medium">Cantidad
            <span className="text-sm text-gray-500">(max: {product.quantity})</span>:</label>
          <input type="number" name="quantity" id="quantity" min="1" max={product.quantity}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity} />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Total Price:</label>
          <p className="text-gray-900">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </>
  )
}