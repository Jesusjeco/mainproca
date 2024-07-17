import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sellOrders/edit/$sellOrderId')({
  component: () => <div>Hello /sellOrders/edit/$sellOrderId!</div>
})