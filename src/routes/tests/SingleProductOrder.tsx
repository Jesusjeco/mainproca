import { createFileRoute } from '@tanstack/react-router'
import { SingleProductOrder } from '../../components/products/SingleProductOrder'

export const Route = createFileRoute('/tests/SingleProductOrder')({
  component: SingleProductOrderIndex
})

function SingleProductOrderIndex() {
  return (
    <>
      <h2>SingleProductOrderIndex</h2>
      <SingleProductOrder />
    </>
  )
} 