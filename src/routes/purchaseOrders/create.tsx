import { createFileRoute } from "@tanstack/react-router";
import { useClientsStore } from "../../store/clientStore";
import { LoadingComponent } from "../../components/LoadingComponent";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProductsStore } from "../../store/productStore";
import { Client } from "../../interfaces/Client";
import { Product } from "../../interfaces/Product";
import { ProductOrder, PurchaseOrder, emptyProductOrder, emptyPurchaseOrder } from "../../interfaces/PurchaseOrder";

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
  const [clientID, setClientID] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<Number>(0.00);
  const [orderDate, setOrderDate] = useState<Date>(new Date)

  //Variable to build the new Purchase Order
  const [newPurchaseOrder, setNewPurchaseOrder] = useState<PurchaseOrder>(emptyPurchaseOrder);

  const [selectedProduct, setSelectedProduct] = useState<ProductOrder>(emptyProductOrder)

  const clientHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setClientID(e.target.value);
  }//clientHandler

  const totalPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalPrice(Number(e.target.value));
    console.log("totalPrice: " + totalPrice);
  }

  const setOrderDateHandler = (date: Date | null) => {
    if (date === null)
      date = new Date();

    setOrderDate(date);
    setNewPurchaseOrder({
      ...newPurchaseOrder,
      'orderDate': date
    }
    );
  }

  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form button pushed");
  }

  useEffect(() => {
    fetchClients();
    fetchProducts();
    console.log(selectedProduct);
    console.log(clientID);
  }, [selectedProduct]);
  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Crear orden de compra</h2>
        <form onSubmit={formHandler}>
          <div className="mb-4">
            <ClientSelectList clients={clients} clientHandler={clientHandler} />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-6 inline">Product Table</h2>
              <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md">Agregar producto</button>
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
                      <ProductSelectList products={products} setSelectedProduct={setSelectedProduct} />
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
  setSelectedProduct: Dispatch<SetStateAction<ProductOrder>>
}
function ProductSelectList({ products, setSelectedProduct }: ProductSelectListProps) {

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
    setSelectedProduct(componentProduct);
  }, [componentProduct]);
  return (
    <>
      {
        products.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2 items-center">
            <select
              name="product"
              id="product"
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