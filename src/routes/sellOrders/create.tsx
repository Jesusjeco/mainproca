import { createFileRoute } from "@tanstack/react-router";
import "react-datepicker/dist/react-datepicker.css";
import { ClientSelectList } from "../../components/clients/ClientSelectList";
import { useClientsStore } from "../../store/clientStore";
import { FormEvent, useEffect, useState } from "react";
import { LoadingComponent } from "../../components/LoadingComponent";
import { Client, emptyClient } from "../../interfaces/Client";
import DatePicker from "react-datepicker";
import { AddressSelectList } from "../../components/clients/AddressSelectList";

export const Route = createFileRoute('/sellOrders/create')({
  component: CreateSellOrder
})

function CreateSellOrder() {
  const fetchClients = useClientsStore(state => state.fetchClients)
  const loadingClients = useClientsStore(state => state.loading)
  const clients = useClientsStore(state => state.clients)
  useEffect(() => {
    fetchClients()
  }, []);

  //Client 
  const [client, setClient] = useState<Client>(emptyClient)
  const clientResult = (newClient: Client) => {
    if (newClient._id !== "")
      setClient(newClient)
    else {
      setClient(emptyClient)
      setAddress("");
    }
  }
  useEffect(() => {
    console.log(client);
  }, [client])

  //Order date
  const [orderDate, setOrderDate] = useState<Date>(new Date);
  const orderDateResult = (newDate: Date | null) => {
    if (newDate)
      setOrderDate(newDate)
  }
  useEffect(() => {
    console.log(orderDate, "orderDate");
  }, [orderDate])

  const [address, setAddress] = useState<string>("");
  const resultAddress = (newAddress: string) => {
    setAddress(newAddress);
  }
  useEffect(() => {
    console.log(address, "address");
  }, [address])

  //Form Handler
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form handler. Form clicked");

  }
  return (
    <>
      <LoadingComponent var1={loadingClients} />
      <div className="w-full lg:w-4/5 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">
          Orden de venta</h2>
        <form onSubmit={formHandler}>
          <div className="grid gap-4 lg:grid-cols-2">
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
            <AddressSelectList client={client} resultAddress={resultAddress} label="address" className="w-full border border-gray-300 rounded-md p-2" />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Crear orden</button>
          </div>

        </form>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-6 inline">
            Productos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">
                    Productos</th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">
                    Precio</th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">
                    Cantidad</th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">
                    Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="py-2 px-4 border-b border-gray-300">
                  <td>
                    Producto 1 x 1</td>
                  <td id="price" className=" border border-gray-300 rounded-md p-2 pr-10">
                    0.05<span className="text-gray-500">
                      $</span>
                  </td>
                  <td className="border border-gray-300 rounded-md p-2">
                    1</td>
                  <td>
                    0.05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4">
          <div className="block text-gray-700 font-medium mb-2 text-right">
            Precio total*</div>
          <p id="totalPrice" className="w-full border border-gray-300 rounded-md p-2 text-right">
            0.05</p>
        </div>
      </div>

    </>

  )
}