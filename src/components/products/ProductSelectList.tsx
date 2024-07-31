import { useEffect, useState } from "react";
import { emptyProduct, Product } from "../../interfaces/Product";

interface ProductSelectListProps {
  products: Product[]
  selectedProductId?: string | undefined
  productResult: (product: Product) => void
  className?: string | undefined,
  label?: string | undefined
}
export function ProductSelectList({ products, selectedProductId, className, productResult, label }: ProductSelectListProps) {
  const [productID, setProductID] = useState<string>("");
  useEffect(() => {
    if (selectedProductId)
      setProductID(selectedProductId)
  }, [selectedProductId])
  useEffect(() => {
    const product = products.find(product => product._id === productID);
    if (product)
      productResult(product)
  }, [productID]);

  return (
    <>
      {products.length > 0 ?
        <select required name={label} id={label} className={className}
          value={productID}
          onChange={(e) => setProductID(e.target.value)}>
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