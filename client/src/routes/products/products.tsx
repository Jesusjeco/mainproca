import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/products')({
  component: () => <div>Hello /products/products!</div>
})