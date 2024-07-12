import { createFileRoute } from '@tanstack/react-router'
import { fetchSellOrderById } from '../../apiCalls/sellOrders'
import { FetchErrorComponent } from '../../components/FetchErrorComponent'
import { NotFoundComponent } from '../../components/NotFoundComponent'

export const Route = createFileRoute('/sellOrders/edit/$sellOrderId')({
  loader: async ({ params: { sellOrderId } }) => fetchSellOrderById(sellOrderId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="SellOrdere no encontrado" />,
  component: EditSellOrder
})

function EditSellOrder() {
  return (
    <h1>EditSellOrder component</h1>
  )
}