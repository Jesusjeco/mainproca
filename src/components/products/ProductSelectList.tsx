import { useEffect, useState } from "react";
import { emptyProduct, Product } from "../../interfaces/Product";

interface ProductSelectListProps {
  products: Product[],
  productResult: (product: Product) => void
  className?: string | undefined,
  label?: string | undefined
}
export function ProductSelectList({ products, className, productResult, label }: ProductSelectListProps) {
  const [productID, setProductID] = useState<string>("");

  useEffect(() => {
    const product = products.find(product => product._id === productID);
    if (product)
      productResult(product)
    else
      productResult(emptyProduct)
  }, [productID]);

  return (
    <>
      {products.length > 0 ?
        <select required name={label} id={label} onChange={(e) => setProductID(e.target.value)} className={className}>
          <option value="">Select a product</option>
          {products.map((product, index) =>
            //Making sure not to show products that are run out in the inventory
            product.quantity > 0 ? <option key={index} value={product._id}>{product.name}</option> : ""
          )}
        </select>
        : "Lista de productos vacia"}
    </>
  );
}