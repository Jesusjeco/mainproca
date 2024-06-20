import { Link, createFileRoute } from '@tanstack/react-router'
import { fetchAllProducts } from "../../fetchCalls/products"
import "./products.pcss"

export const Route = createFileRoute('/products/')({
  loader: fetchAllProducts,
  component: Products,
})

interface Product {
  _id: string,
  name: string,
  quantity: number
}

function Products() {
  const allProducts = Route.useLoaderData<Product[]>()

  return (
    <section id='products'>
      <h1>Products Component</h1>
      {
        allProducts.length > 1 ?
          <ul>
            {allProducts.map((product, index) =>
              <li key={index}>
                <Link to={'/products/' + product._id}>
                  {product.name}
                </Link><span>- {product.quantity}</span>
              </li>
            )}
          </ul>

          :
          "No hay productos en inventario"
      }
    </section>
  )
}