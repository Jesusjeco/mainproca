import { useEffect, useState } from "react";
import { emptyProductOrder, ProductOrder } from "../../interfaces/ProductOrder";
import { SingleProductOrder } from "../productOrder/SingleProductOrder";
import { Product } from "../../interfaces/Product";
import { FaMinusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

interface MultiProductOrderProps {
  products: Product[];
  initialProductOrders?: ProductOrder[];
  resultProducts: (newProductsOrder: ProductOrder[]) => void;
}

export function MultiProductOrder({ products, initialProductOrders = [], resultProducts }: MultiProductOrderProps) {
  const [productsOrder, setProductsOrder] = useState<ProductOrder[]>(initialProductOrders);
  const [productsOrderKeys, setProductsOrderKeys] = 
  useState<string[]>(initialProductOrders ? initialProductOrders.map(() => uuidv4()) : []);

  useEffect(() => {
    resultProducts(productsOrder);
  }, [productsOrder]);

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

  const productOrderResult = (index: number, newProductOrder: ProductOrder) => {
    const copy_ProductOrderArray = [...productsOrder];
    copy_ProductOrderArray[index] = newProductOrder;
    setProductsOrder(copy_ProductOrderArray);
  };

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
            <SingleProductOrder products={products} index={index} selectedProductOrder={productOrder} productOrderResult={productOrderResult} />
            <button type="button" className="text-red-500 hover:text-red-700" onClick={() => removeProductOrder(index)}>
              <FaMinusSquare size={25} />
            </button>
          </div>
        ))
      ) : (
        "Productos no agregados"
      )}
    </>
  );
}
