import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "react-datepicker/dist/react-datepicker.css";
import { ClientSelectList } from "../../components/clients/ClientSelectList";
import { useClientsStore } from "../../store/clientStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent";
import { Client, emptyClient } from "../../interfaces/Client";
import DatePicker from "react-datepicker";
import { AddressSelectList } from "../../components/clients/AddressSelectList";
import { MultiProductOrder } from "../../components/sellOrder/MultiProductOrder";
import { useProductsStore } from "../../store/productStore";
import { ProductOrder } from "../../interfaces/ProductOrder";
import { AvoidEnterKeyPress } from "../../utils/AvoidEnterKeyPress";
import { useSellOrdersStore } from "../../store/sellOrderStore";

export const Route = createFileRoute('/sellOrders/create')({
  component: CreateSellOrder
})

function CreateSellOrder() {
  // Form functions and variables
  //Form ref and navigation
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Using Zustand Sell Order store
  const createSellOrder = useSellOrdersStore(state => state.createSellOrder)

  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const clients = useClientsStore(state => state.clients)
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const availableProducts = useProductsStore(state => state.availableProducts)
  const productsLoading = useProductsStore(state => state.loading);

  useEffect(() => {
    fetchClients()
    fetchProducts();
  }, []);

  //Client 
  const [client, setClient] = useState<Client | undefined>(undefined)
  const clientResult = (newClient: Client | undefined) => {
    if (newClient) {
      if (newClient._id !== "")
        setClient(newClient)
      else {
        setClient(emptyClient)
        setAddress("");
      }
    }
  }

  //Order date
  const [orderDate, setOrderDate] = useState<Date>(new Date);
  const orderDateResult = (newDate: Date | null) => {
    if (newDate)
      setOrderDate(newDate)
  }

  const [address, setAddress] = useState<string>("");
  const resultAddress = (newAddress: string) => {
    setAddress(newAddress);
  }

  // Products
  const [products, setProducts] = useState<ProductOrder[]>([])
  const resultProducts = (newProductsOrder: ProductOrder[]) => {
    setProducts(newProductsOrder);
  }

  //total price
  const [totalPrice, setTotalPrice] = useState<number>(0.00);
  useEffect(() => {
    const newTotalPrice = products.map(product => product.price * product.quantity)
    setTotalPrice(newTotalPrice.reduce((acumulator, currentValue) => acumulator + currentValue, 0))
  }, [products])

  //Form Handler
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (client) {
      const newSellOrder = {
        _id: "",
        orderNumber: "",
        client_id: client._id,
        address,
        products,
        orderDate,
        totalPrice,
      }

      const response = await createSellOrder(newSellOrder);
      //Redirecting user to clients page
      if (response.success) {
        // Reset the form after submission
        if (formRef.current)
          formRef.current.reset();
        navigate({ to: "/sellOrders" });
      } else {
        // Handle error
        console.error('Failed to update client');
      }
    }
  }//formHandler
  
  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <div className="w-full lg:w-4/5 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">
          Crear nota de entrega</h2>
        {clients ?
          <form onSubmit={formHandler} ref={formRef} onKeyDown={AvoidEnterKeyPress}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="client_id" className="block text-gray-700 font-medium mb-2">
                  Cliente</label>
                <ClientSelectList clients={clients} clientResult={clientResult} className="w-full border border-gray-300 rounded-md p-2" label="client_id" />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="orderDate" className="block text-gray-700 font-medium mb-2">
                  Fecha de orden</label>
                <DatePicker
                  id="orderDate"
                  name="orderDate"
                  required
                  selected={orderDate}
                  onChange={orderDateResult}
                  className="w-full border border-gray-300 rounded-md p-2"
                  dateFormat={"dd MMMM yyyy"}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Dirección</label>
              {client ?
                <AddressSelectList client={client} resultAddress={resultAddress} label="address" className="w-full border border-gray-300 rounded-md p-2" />
                : <div>Debe escoger un cliente</div>}
            </div>

            {availableProducts ?
              <div className="mb-4">
                <MultiProductOrder products={availableProducts} resultProducts={resultProducts} />
              </div>
              : <div>No se encuentran productos para mostrar</div>
            }

            <div className="mb-4">
              <div className="block text-gray-700 font-medium mb-2 text-right">
                Precio total*</div>
              <p id="totalPrice" className="w-full border border-gray-300 rounded-md p-2 text-right">
                {totalPrice.toFixed(2)}</p>
            </div>

            <div className="flex justify-end">
              <button type="submit"
                disabled={!client}
                className="bg-green-500 text-white px-4 py-2 rounded-md">Crear orden</button>
            </div>
          </form>
          : "No hay clientes registrados"}
      </div>
    </>
  )
}