import { useEffect, useState } from "react"
import { emptyProductOrder, ProductOrder } from "../../interfaces/ProductOrder"
import { SingleProductOrder } from "../productOrder/SingleProductOrder"
import { Product } from "../../interfaces/Product";
import { FaMinusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

interface MultiProductOrderProps {
  products: Product[];
  resultProducts: (newProductsOrder: ProductOrder[]) => void;
}
export function MultiProductOrder({ products, resultProducts }: MultiProductOrderProps) {
  const [productOrderArray, setProductOrderArray] = useState<ProductOrder[]>([])
  const [productOrderKeys, setProductOrderKeys] = useState<string[]>([]);
  useEffect(() => {
  }, [productOrderArray])
  const addProductOrder = () => {
    const tempId = uuidv4();
    setProductOrderKeys(prev => [...prev, tempId]);
    setProductOrderArray(prev => [...prev, emptyProductOrder])
  }
  const removeProductOrder = (index: number) => {
    const copy_productOrderKeys = [...productOrderKeys,]
    const copy_productOrderArray = [...productOrderArray]
    copy_productOrderKeys.splice(index, 1);
    copy_productOrderArray.splice(index, 1);
    setProductOrderKeys(copy_productOrderKeys)
    setProductOrderArray(copy_productOrderArray)
  }//removeProductOrder
  const productOrderResult = (index: number, newProductOrder: ProductOrder) => {
    const copy_ProductOrderArray = [
      ...productOrderArray,
    ]
    copy_ProductOrderArray[index] = newProductOrder
    setProductOrderArray(copy_ProductOrderArray)
  }
  useEffect(() => {
    resultProducts(productOrderArray);
  }, [productOrderArray])
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6 inline">
          Productos</h2>
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={addProductOrder}>Agregar producto</button>
      </div>

      {productOrderArray.length > 0 ?
        productOrderArray.map((_, index) =>
          <div key={productOrderKeys[index]} className="flex">
            <SingleProductOrder products={products} index={index} productOrderResult={productOrderResult} />

            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => removeProductOrder(index)} >
              <FaMinusSquare size={25} />
            </button>
          </div>
        )
        : "Productos no agregados"}
    </>
  )
}