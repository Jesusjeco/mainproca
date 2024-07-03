import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useClientsStore } from "../../store/clientStore";
import { LoadingComponent } from "../../components/LoadingComponent";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProductsStore } from "../../store/productStore";
import { Client } from "../../interfaces/Client";
import { Product } from "../../interfaces/Product";
import { ProductOrder, emptyProductOrder } from "../../interfaces/PurchaseOrder";
import { createPurchaseOrder } from "../../apiCalls/purchaseOrders";

export const Route = createFileRoute('/purchaseOrders/create')({
  component: CreatePurchaseOrder
})

function CreatePurchaseOrder() {
  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const clients = useClientsStore(state => state.clients);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const products = useProductsStore(state => state.products);
  const productsLoading = useProductsStore(state => state.loading);

  //Variables used to create the Purchase order

  // Client ID
  const [clientID, setClientID] = useState<string>("");
  const clientHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setClientID(e.target.value);
  }//clientHandler

  // Products array
  const [selectedProducts, setSelectedProducts] = useState<ProductOrder[]>([])
  const addNewProduct = () => {
    const auxProductList = [...selectedProducts, emptyProductOrder];
    setSelectedProducts(auxProductList);
  }
  const setSelectedProductsHandler = (productData: ProductOrder, index: number) => {
    const auxProductList = [...selectedProducts];
    auxProductList[index] = productData;
    setSelectedProducts(auxProductList);
  }

  // Total price
  const [totalPrice, setTotalPrice] = useState<number>(0.00);
  const totalPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalPrice(Number(e.target.value));
  }

  //Order date
  const [orderDate, setOrderDate] = useState<Date>(new Date)
  const setOrderDateHandler = (date: Date | null) => {
    if (date === null)
      date = new Date();

    setOrderDate(date);
  }

  //Form ref and navigation
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Form handler
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPurchaseOrder = {
      client: clientID,
      products: selectedProducts,
      totalPrice: totalPrice,
      orderDate: orderDate
    }

    const response = await createPurchaseOrder(newPurchaseOrder);

    //Redirecting user to clients page
    if (response.success) {
      // Reset the form after submission
      if (formRef.current)
        formRef.current.reset();
      navigate({ to: "/purchaseOrders" });
    } else {
      // Handle error
      console.error('Failed to update client');
    }

  }

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Crear orden de compra</h2>
        <form onSubmit={formHandler} ref={formRef}>
          <div className="mb-4">
            <ClientSelectList clients={clients} clientHandler={clientHandler} />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-6 inline">Product Table</h2>
              <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={addNewProduct}>Agregar producto</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Productos</th>
                    <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3} className="py-2 px-4 border-b border-gray-300">
                      {selectedProducts.length > 0 ?
                        selectedProducts.map((_, index) =>
                          <ProductSelectList products={products}
                            setSelectedProductsHandler={setSelectedProductsHandler}
                            index={index}
                            key={index} />
                        )
                        : "Sin productos"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="totalPrice" className="block text-gray-700 font-medium mb-2">Total Price*</label>
            <input
              required
              disabled
              min={0}
              type="number"
              step="0.01"
              id="totalPrice"
              name="totalPrice"
              placeholder="Enter total price"
              onChange={totalPriceHandler}
              value={totalPrice.toFixed(2)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="orderDate" className="block text-gray-700 font-medium mb-2">Order Date</label>
            <DatePicker
              id="orderDate"
              name="orderDate"
              required
              selected={orderDate}
              onChange={setOrderDateHandler}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

interface ClientSelectListProps {
  clients: Client[],
  clientHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}
function ClientSelectList({ clients, clientHandler }: ClientSelectListProps) {
  return (
    <>
      <label htmlFor="client" className="block text-gray-700 font-medium mb-2">Client*</label>
      {
        clients.length > 0 ? (
          <select
            name="client"
            id="client"
            required
            onChange={clientHandler}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
        ) : (
          <p className="text-red-500">Client list is empty</p>
        )
      }
    </>
  )
}

interface ProductSelectListProps {
  products: Product[],
  setSelectedProductsHandler: (productData: ProductOrder, index: number) => void,
  index: number
}
function ProductSelectList({ products, setSelectedProductsHandler, index }: ProductSelectListProps) {

  const [componentProduct, setComponentProduct] = useState<ProductOrder>(emptyProductOrder)
  const componentProductHandler = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setComponentProduct(
      {
        ...componentProduct,
        [name]: name === 'quantity' ? Number(value) : value
      }
    )
  }//componentProductHandler

  useEffect(() => {
    setSelectedProductsHandler(componentProduct, index);
  }, [componentProduct]);
  return (
    <>
      {
        products.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2 items-center">
            <select
              name="product"
              id="product"
              required
              onChange={componentProductHandler}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>{product.name} - {product.price}$</option>
              ))}
            </select>
            <input
              type="number"
              step={1}
              min={0}
              required
              name="quantity"
              id="quantity"
              onChange={componentProductHandler}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ) : (
          <p className="text-red-500">Product list is empty</p>
        )
      }
    </>
  )
}