import { createFileRoute } from '@tanstack/react-router'
import { SingleProductOrder } from '../../components/productOrder/SingleProductOrder'
import { useState } from 'react'
import { emptyProductOrder, ProductOrder } from '../../interfaces/ProductOrder';

export const Route = createFileRoute('/tests/SingleProductOrder')({
  component: SingleProductOrderIndex
})

function SingleProductOrderIndex() {
  const [productOrder, setProductOrder] = useState<ProductOrder>(emptyProductOrder);
  const productOrderResult = (_: number, newProductOrder: ProductOrder) => {
    setProductOrder(newProductOrder);
  }
  return (
    <>
      <h2>SingleProductOrder</h2>
      <div>Producto id: {productOrder.product_id}</div>
      <div>Producto precio: {productOrder.price}</div>
      <div>Producto cantidad: {productOrder.quantity}</div>
      <div>Total de orden por producto: {productOrder.price * productOrder.quantity}</div>
      <SingleProductOrder productOrderResult={productOrderResult} />
    </>
  )
} 