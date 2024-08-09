import { useEffect, useState } from "react"
import { ProductIdComponent } from "../products/ProductIdComponent"
import { ProductOrder } from "../../interfaces/ProductOrder";

interface ProductOrderComponentProps {
  setProductOrderResult: (newProductOrder: ProductOrder | undefined, index: number) => void;
  index: number
  selectedProductOrder?: ProductOrder;
}
export function ProductOrderComponent({ setProductOrderResult, index, selectedProductOrder = undefined }: ProductOrderComponentProps) {
  //if selectedProductOrder has a value
  useEffect(() => {
    if (selectedProductOrder) {
      setProductOrder(selectedProductOrder)
      setProductId(selectedProductOrder.product_id)
      setPrice(selectedProductOrder.price)
      setQuantity(selectedProductOrder.quantity)
    }
  }, [selectedProductOrder])
  const [productOrder, setProductOrder] = useState<ProductOrder | undefined>(undefined)
  const [productId, setProductId] = useState<string | undefined>(undefined)
  const productIdResult = (newProductId: string | undefined) => {
    if (newProductId) {
      setProductId(newProductId)
    } else { setProductId(undefined) }
  }
  const [price, setPrice] = useState<number>(0.00)
  const [quantity, setQuantity] = useState(0.00)

  //create ProductOrder
  useEffect(() => {
    if (productId && price && quantity)
      setProductOrder(
        {
          product_id: productId,
          price,
          quantity
        }
      )
  }, [productId, price, quantity])

  //Sending ProductOrder
  useEffect(() => {
    setProductOrderResult(productOrder, index)
  }, [productOrder])

  return (
    <div className="grid grid-cols-3 gap-4">
      <ProductIdComponent productIdResult={productIdResult} initialProductId={productId} />
      <div>
        <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Cantidad*</label>
        <input required min={0.01} type="number" step={0.01} id="quantity" name="quantity" placeholder="Enter quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio*</label>
        <input required min={0.01} type="number" step="0.01" id="price" name="price" placeholder="Enter price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
    </div>
  )
}