import { CSSProperties, useEffect, useState } from "react";
import { ProductSelectList } from "../products/ProductSelectList";
import { emptyProduct, Product } from "../../interfaces/Product";
import { ProductOrder } from "../../interfaces/ProductOrder";

interface SingleProductOrderProps {
  products: Product[];
  selectedProductOrder?: ProductOrder
  productOrderResult: (index: number, newProductOrder: ProductOrder) => void;
  index?: number;
}

export function SingleProductOrder({ products, selectedProductOrder = undefined, productOrderResult, index = 0 }: SingleProductOrderProps) {
  const [productOrder, _] = useState<ProductOrder | undefined>(selectedProductOrder)
  useEffect(() => {
    if (productOrder) {
      const presetProduct = (products.find(product => product._id === productOrder.product_id))
      if (presetProduct)
        setProduct(presetProduct);
      setAlternativePrice(productOrder.price)
      setQuantity(productOrder.quantity)
    }
  }, [productOrder])
  //Single product
  const [product, setProduct] = useState<Product>(emptyProduct);
  const productResult = (newProduct: Product) => {
    setProduct(newProduct)
  }
  7//Alternative price
  const [alternativePrice, setAlternativePrice] = useState<number>(0.00);

  //Quantity
  const [quantity, setQuantity] = useState<number>(0)

  //Total price
  const [subTotal, setSubTotal] = useState<number>(0.00);
  useEffect(() => {
    setSubTotal(alternativePrice * quantity)
  }, [alternativePrice, quantity])

  useEffect(() => {
    productOrderResult(index, {
      product_id: product._id,
      price: alternativePrice,
      quantity: quantity
    })
  }, [product, subTotal])

  const quantityLimitReach: CSSProperties = {
    color: 'red',
    fontWeight: 'bold',
    backgroundColor: '#eecaca',
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="product" className="block text-gray-700 font-medium">Producto:</label>
          <ProductSelectList products={products} selectedProductId={product._id} productResult={productResult} label={"product"}
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
          <input type="number" step={0.1} min="0" name="quantity" id="quantity" max={product.quantity}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            style={quantity === product.quantity ? quantityLimitReach : undefined}
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity} />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Acumulado:</label>
          <div className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300">${subTotal.toFixed(2)}</div>
        </div>
      </div>
    </>
  )
}