import { useEffect, useState } from "react"
import { ProductOrderComponent } from "./ProductOrderComponent"
import { emptyProductOrder, ProductOrder } from "../../interfaces/ProductOrder"
import { v4 as uuidv4 } from 'uuid';
import { FaMinusSquare } from "react-icons/fa";

interface ProductsOrderComponentProps {
  initialProductsOrder?: ProductOrder[];
  setProductsOrderResult: (newProductsOrder: ProductOrder[]) => void;
}
export function ProductsOrderComponent({ initialProductsOrder = [], setProductsOrderResult }: ProductsOrderComponentProps) {
  const [productsOrder, setProductsOrder] = useState<ProductOrder[]>(initialProductsOrder)
  const setProductOrderResult = (newProductOrder: ProductOrder | undefined, index: number) => {
    if (newProductOrder) {
      const productsOrder_copy = [...productsOrder]
      productsOrder_copy[index] = newProductOrder;
      setProductsOrder(productsOrder_copy)
    }
  }

  const [productsOrderKeys, setProductsOrderKeys] =
    useState<string[]>(initialProductsOrder ? initialProductsOrder.map(() => uuidv4()) : []);

  const addProductOrder = () => {
    const tempId = uuidv4();
    setProductsOrderKeys(prev => [...prev, tempId]);
    setProductsOrder(prev => [...prev, emptyProductOrder]);
  };

  const removeProductOrder = (index: number) => {
    const copy_productOrderKeys = [...productsOrderKeys];
    const copy_productOrderArray = [...productsOrder];
    copy_productOrderKeys.splice(index, 1);
    copy_productOrderArray.splice(index, 1);
    setProductsOrderKeys(copy_productOrderKeys);
    setProductsOrder(copy_productOrderArray);
  };

  //Returning ProductsOrder
  useEffect(() => {
    if (productsOrder)
      setProductsOrderResult(productsOrder)
  }, [productsOrder])
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6 inline">Productos</h2>
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={addProductOrder}>
          Agregar producto
        </button>
      </div>

      {productsOrder.length > 0 ? (
        productsOrder.map((productOrder, index) => (
          <div key={productsOrderKeys[index]} className="flex">
            <ProductOrderComponent setProductOrderResult={setProductOrderResult} index={index} selectedProductOrder={productOrder} />
            <button type="button" className="text-red-500 hover:text-red-700" onClick={() => removeProductOrder(index)}>
              <FaMinusSquare size={25} />
            </button>
          </div>
        ))
      ) : (
        "Productos no agregados"
      )}

    </>
  )
}