import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "react-datepicker/dist/react-datepicker.css";
import { ClientSelectList } from "../../components/clients/ClientSelectList";
import { useClientsStore } from "../../store/clientStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent";
import { Client } from "../../interfaces/Client";
import DatePicker from "react-datepicker";
import { useProductsStore } from "../../store/productStore";
import { ProductOrder } from "../../interfaces/ProductOrder";
import { AvoidEnterKeyPress } from "../../utils/AvoidEnterKeyPress";
import { usePurchaseOrdersStore } from "../../store/purchaseOrderStore";
import { ProductsOrderComponent } from "../../components/productOrder/ProductsOrderComponent";

export const Route = createFileRoute('/purchaseOrders/create')({
  component: CreatePurchaseOrder
})

function CreatePurchaseOrder() {
  // Form functions and variables
  //Form ref and navigation
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Using Zustand Sell Order store
  const createPurchaseOrder = usePurchaseOrdersStore(state => state.createPurchaseOrder)
  const loadingPurchaseOrder = usePurchaseOrdersStore(state => state.loading)

  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const clients = useClientsStore(state => state.clients)
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const productsLoading = useProductsStore(state => state.loading);

  useEffect(() => {
    fetchClients()
    fetchProducts();
  }, []);

  //orderNumber
  const [orderNumber, setOrderNumber] = useState<string>("")

  //Client 
  const [client, setClient] = useState<Client | undefined>(undefined)
  const clientResult = (newClient: Client | undefined) => {
    if (newClient) {
      if (newClient._id !== "")
        setClient(newClient)
      else {
        setClient(undefined)
      }
    }
  }

  //Order date
  const [orderDate, setOrderDate] = useState<Date>(new Date);
  const orderDateResult = (newDate: Date | null) => {
    if (newDate)
      setOrderDate(newDate)
  }

  //productsOrder
  const [productsOrder, setProductsOrder] = useState<ProductOrder[]>([])
  const setProductsOrderResult = (newProductsOrder: ProductOrder[]) => {
    if (newProductsOrder)
      setProductsOrder(newProductsOrder)
    else
      setProductsOrder([])
  }//setProductsOrderResult

  const [description, setDescription] = useState<string>("")

  //Form Handler
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (client && productsOrder && productsOrder.length > 0) {
      const newPurchaseOrder = {
        _id: "",
        orderNumber,
        client_id: client._id,
        productsOrder,
        orderDate,
        description
      }

      const response = await createPurchaseOrder(newPurchaseOrder);
      //Redirecting user to clients page
      if (response.success) {
        const newID = response.data._id;
        // Reset the form after submission
        if (formRef.current)
          formRef.current.reset();
        navigate({ to: "/purchaseOrders/" + newID });
      } else {
        // Handle error
        console.error('Failed to update client');
      }
    } else {
      alert("Orden incompleta. Falta el cliente o agregar productos")
    }
  }//formHandler

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} var3={loadingPurchaseOrder} />
      <div className="w-full lg:w-5/6 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">
          Registrando factura de compra</h2>
        {clients ?
          <form onSubmit={formHandler} ref={formRef} onKeyDown={AvoidEnterKeyPress}>
            <div className="mb-4">
              <label htmlFor="orderNumber" className="block text-gray-700 text-sm font-bold mb-2">Número de factura*</label>
              <input required type="text" id="orderNumber" name="orderNumber" placeholder="Enter orderNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="client_id" className="block text-gray-700 font-medium mb-2">
                  Proveedor</label>
                <ClientSelectList clients={clients} clientResult={clientResult} className="w-full border border-gray-300 rounded-md p-2" label="client_id" />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="orderDate" className="block text-gray-700 font-medium mb-2">
                  Fecha de compra</label>
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
              <ProductsOrderComponent setProductsOrderResult={setProductsOrderResult} />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea required rows={4} id="description" name="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button type="submit"
                className="text-white px-4 py-2 rounded-md bg-green-500" >
                Crear orden
              </button>
            </div>
          </form>
          : "No hay clientes registrados"}
      </div>
    </>
  )
}