import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { editSellOrderById, fetchSellOrderById } from '../../apiCalls/sellOrders'
import { SellOrder } from "../../interfaces/SellOrder"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent'
import { NotFoundComponent } from '../../components/NotFoundComponent'
import { DMYdate } from '../../utils/dates'
import { useClientsStore } from '../../store/clientStore'
import { useProductsStore } from '../../store/productStore'
import { LoadingComponent } from '../../components/LoadingComponent'
import { Client } from '../../interfaces/Client'
import DatePicker from 'react-datepicker'

export const Route = createFileRoute('/sellOrders/edit/$sellOrderId')({
  loader: async ({ params: { sellOrderId } }) => fetchSellOrderById(sellOrderId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="SellOrdere no encontrado" />,
  component: EditSellOrder
})

function EditSellOrder() {
  const sellOrder = Route.useLoaderData<SellOrder>()

  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const clients = useClientsStore(state => state.clients);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const products = useProductsStore(state => state.products);
  const productsLoading = useProductsStore(state => state.loading);

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  const [newSellOrder, setNewSellOrder] = useState<SellOrder>(sellOrder)

  //Variables used to create the Purchase order

  // Client ID
  const [clientID, setClientID] = useState<string>(sellOrder.client);
  const clientHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setClientID(e.target.value);
  }//clientHandler

  //Order date
  const [orderDate, setOrderDate] = useState<Date>(sellOrder.orderDate);
  const setOrderDateHandler = (date: Date | null) => {
    if (date === null)
      date = new Date();

    setOrderDate(date);
  }

  //Client address
  const [address, setAddress] = useState<string>(sellOrder.address);
  const [addressArray, setAddressArray] = useState<string[]>([]);
  useEffect(() => {
    const client = clients.find((client) => client._id === clientID);
    if (client) {
      const legalAddress = client.legal_address;
      const offices = client.offices?.map((office) => office.address);

      if (offices) {
        setAddressArray(
          [legalAddress, ...offices]
        )
      } else
        setAddressArray(
          [legalAddress]
        )
    }
  }, [clientID,address]);

  //Form ref and navigation
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  function formHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log("Form submit clicked");

  }

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <div className="w-full lg:w-4/5 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Crear orden de compra</h2>
        <form onSubmit={formHandler} ref={formRef}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="mb-4">
              <ClientSelectList clients={clients} clientHandler={clientHandler} currentClientId={clientID} />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="orderDate" className="block text-gray-700 font-medium mb-2">Order Date</label>
              <DatePicker
                id="orderDate"
                name="orderDate"
                required
                selected={orderDate}
                onChange={setOrderDateHandler}
                className="w-full border border-gray-300 rounded-md p-2"
                dateFormat={"dd MMMM yyyy"}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Dirección</label>
            {clientID ?
              <select name="address" id="address" value={address}
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setAddress(e.target.value)}>
                {
                  addressArray.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                  )
                }
              </select>
              : <p>Escoja un cliente para cargar las direcciones</p>
            }
          </div>

          {/* <div className="mb-4">
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
                    <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Precio</th>
                    <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Cantidad</th>
                    <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="py-2 px-4 border-b border-gray-300">
                      {selectedProducts.length > 0 ?
                        selectedProducts.map((_, index) =>
                          <ProductSelectList products={products}
                            setSelectedProductsHandler={setSelectedProductsHandler}
                            setProductTotalPrice={setTotalProductPriceArrayHandler}
                            index={index}
                            key={index} />
                        )
                        : "Sin productos"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

          {/* <div className="mb-4">
            <label htmlFor="totalPrice" className="block text-gray-700 font-medium mb-2 text-right">Precio total*</label>
            <input
              required
              disabled
              min={0}
              type="number"
              step="0.01"
              id="totalPrice"
              name="totalPrice"
              placeholder="Precio total"
              value={purchasePrice.toFixed(2)}
              className="w-full border border-gray-300 rounded-md p-2 text-right"
            />
          </div> */}

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
  clientHandler: (e: ChangeEvent<HTMLSelectElement>) => void,
  currentClientId: string | null;
}
function ClientSelectList({ clients, clientHandler, currentClientId }: ClientSelectListProps) {
  return (
    <>
      <label htmlFor="client" className="block text-gray-700 font-medium mb-2">Cliente*</label>
      {
        clients.length > 0 ? (
          <select
            name="client"
            id="client"
            required
            onChange={clientHandler}
            className="w-full border border-gray-300 rounded-md p-2"
            value={currentClientId ?? ""}
          >
            <option value="">Select a client</option>
            {
              clients.map((client) =>
                <option key={client._id} value={client._id}>{client.rif} - {client.name}</option>
              )
            }
          </select>
        ) : (
          <p className="text-red-500">Client list is empty</p>
        )
      }
    </>
  )
}