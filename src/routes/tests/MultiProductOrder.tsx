import { createFileRoute } from '@tanstack/react-router'
import { MultiProductOrder } from '../../components/sellOrder/MultiProductOrder'

export const Route = createFileRoute('/tests/MultiProductOrder')({
  component: index
})

function index() {
  return (
    <>
      <h2>MultiProductOrder</h2>
      <MultiProductOrder />
    </>
  )
}