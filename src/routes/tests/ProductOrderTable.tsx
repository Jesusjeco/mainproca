import { createFileRoute } from '@tanstack/react-router'
import { ProductOrderTable } from '../../components/products/ProductOrderTable'

export const Route = createFileRoute('/tests/ProductOrderTable')({
  component: ProductOrderTableIndex
})

function ProductOrderTableIndex() {
  return (
    <>
      <h2>ProductOrderTableIndex</h2>
      <ProductOrderTable />
    </>
  )
}