import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";

interface ProductSelectListProps {
  products: Product[],
  productResult: (product: Product) => void
  className?: string | undefined
}
export function ProductSelectList({ products, className, productResult }: ProductSelectListProps) {
  const [productID, setProductID] = useState<string>("");

  useEffect(() => {
    const product = products.find(product => product._id === productID);
    if (product)
      productResult(product)
    else
      console.log("Error en ProductSelectList component");
  }, [productID]);

  return (
    <>
      {products.length > 0 ?
        <select name="product" id="product" onChange={(e) => setProductID(e.target.value)} className={className}>
          <option value="">Select a product</option>
          {products.map((product, index) =>
            <option key={index} value={product._id}>{product.name}</option>
          )}
        </select>
        : "Lista de productos vacia"}
    </>
  );
}