import { useEffect, useState } from "react";

interface Product {
  _id: string,
  name: string,
  quantity: number
}

function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchAllProducts() {
      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow"
      };

      try {
        const response = await fetch(process.env.API_URL_PRODUCTS, requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch All Products');
        }

        const result = await response.json();
        //console.log(result)
        setAllProducts(result);
      } catch (error) {
        console.error(error);
      };
    }

    fetchAllProducts();
  }, []);


  return (
    <>
      Products Component
      {
        allProducts.length > 1 ?
          <ul>
            {allProducts.map((product, index) =>
              <li key={index}>
                <div>{product.name}</div>
                <div>{product.quantity}</div>
              </li>
            )}
          </ul>

          :
          "No hay productos en inventario"
      }
    </>
  )
}

export default Products