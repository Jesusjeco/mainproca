import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/purchaseOrders/')({
  component: Index
})

function Index(){
  return(
    <h2>Compras</h2>
  )
}