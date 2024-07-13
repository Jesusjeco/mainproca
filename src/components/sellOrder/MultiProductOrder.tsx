import { useState } from "react"
import { emptyProductOrder, ProductOrder } from "../../interfaces/ProductOrder"
import { SingleProductOrder } from "../productOrder/SingleProductOrder"

export function MultiProductOrder() {
  const [productOrderArray, setProductOrderArray] = useState<ProductOrder[]>([])
  const addProductOrder = () => {
    setProductOrderArray(prev => [...prev, emptyProductOrder])
  }
  const productOrderResult = (index: number, newProductOrder: ProductOrder) => {
    const copy_ProductOrderArray = [
      ...productOrderArray,
    ]
    copy_ProductOrderArray[index] = newProductOrder
    setProductOrderArray(copy_ProductOrderArray)
  }
  return (
    <>
      <div className="text-right">
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={addProductOrder}>Agregar producto</button>
      </div>

      <div>
        {productOrderArray.length > 0 ?
          productOrderArray.map((_, index) =>
            <SingleProductOrder key={index} index={index} productOrderResult={productOrderResult} />
          )
          : "Productos no agregados"}
      </div>
    </>
  )
}