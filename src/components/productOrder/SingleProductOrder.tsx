import { useEffect, useState } from "react";
import { ProductSelectList } from "../products/ProductSelectList";
import { emptyProduct, Product } from "../../interfaces/Product";
import { emptyProductOrder, ProductOrder } from "../../interfaces/ProductOrder";
import { FaMinusSquare } from "react-icons/fa";

interface SingleProductOrderProps {
  products: Product[];
  productOrderResult: (index: number, newProductOrder: ProductOrder) => void;
  index?: number;
}

export function SingleProductOrder({ products, productOrderResult, index = 0 }: SingleProductOrderProps) {
  //Single product
  const [product, setProduct] = useState<Product>(emptyProduct);
  const productResult = (newProduct: Product) => {
    setProduct(newProduct)
  }
  7//Alternative price
  const [alternativePrice, setAlternativePrice] = useState<number>(0.00);
  useEffect(() => {
    setAlternativePrice(product.price)
    setQuantity(1)
  }, [product]);

  //Quantity
  const [quantity, setQuantity] = useState<number>(0)

  //Total price
  const [totalPrice, setTotalPrice] = useState<number>(0.00);
  useEffect(() => {
    setTotalPrice(alternativePrice * quantity)
  }, [alternativePrice, quantity])

  useEffect(() => {
    productOrderResult(index, {
      product_id: product._id,
      price: alternativePrice,
      quantity: quantity
    })
  }, [product, totalPrice])

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="product" className="block text-gray-700 font-medium">Producto:</label>
          <ProductSelectList products={products} productResult={productResult} label={"product"}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 font-medium">Precio:
            <span className="text-sm text-gray-500">(${product.price})</span> </label>
          <input type="number" name="price" id="price" min={0.01} step={0.01}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
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
          <label className="block text-gray-700 font-medium">Acumulado:</label>
          <div className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">${totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </>
  )
}