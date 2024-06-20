import { createFileRoute, ErrorComponent, ErrorComponentProps } from '@tanstack/react-router'
import { fetchProductById } from '../../fetchCalls/products'

export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params: { productId } }) => fetchProductById(productId),
  errorComponent: PostErrorComponent as any,
  notFoundComponent: () => {
    return <p>Producto no encontrado</p>
  },
  component: SingleProduct
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} /> 
}

interface Product {
  _id: string,
  name: string,
  quantity: number
}

function SingleProduct() {
  const product = Route.useLoaderData<Product>()
  return (
    <>
      <p>id: {product._id}</p>
      <p>name: {product.name}</p>
      <p>cantidad: {product.quantity}</p>
    </>
  )
}