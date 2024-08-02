import { createFileRoute } from '@tanstack/react-router'
import { SellOrder } from "../../interfaces/SellOrder"
import { useEffect, useRef, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { DMYdate } from '../../utils/dates';
import { useClientsStore } from '../../store/clientStore';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { Client } from '../../interfaces/Client';
import { useSellOrdersStore } from '../../store/sellOrderStore';
import FooterSellOrder from '../../components/sellOrder/FooterSellOrder';
import ReactToPrint from 'react-to-print';

interface SingleSellOrderProps {
  sellOrderId: string
}
export const Route = createFileRoute('/sellOrders/$sellOrderId')({
  loader: async ({ params }: { params: SingleSellOrderProps }) => { return params.sellOrderId },
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="SellOrdere no encontrado" />,
  component: SingleSellOrder
})

function SingleSellOrder() {
  const sellOrderId = Route.useLoaderData() as string

  // Using Zustand Sell Order store
  const fetchSellOrders = useSellOrdersStore(state => state.fetchSellOrders)
  const sellOrdersLoading = useSellOrdersStore(state => state.loading)
  const getSellOrderById = useSellOrdersStore(state => state.getSellOrderById)

  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const getClientById = useClientsStore(state => state.getClientById);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const getProductById = useProductsStore(state => state.getProductById);
  const productsLoading = useProductsStore(state => state.loading);

  useEffect(() => {
    fetchSellOrders()
    fetchClients();
    fetchProducts();
  }, []);

  const [sellOrder, setSellOrder] = useState<SellOrder | undefined>(undefined)
  useEffect(() => {
    if (!sellOrdersLoading && !clientsLoading && !productsLoading && sellOrderId) {
      setSellOrder(getSellOrderById(sellOrderId))
    }
  }, [sellOrdersLoading, clientsLoading, productsLoading, sellOrderId])

  const [client, setClient] = useState<Client | undefined>(undefined);
  useEffect(() => {
    if (!clientsLoading && sellOrder)
      setClient(getClientById(sellOrder.client_id))
  }, [clientsLoading, sellOrder])

  //Reference used to print the component
  const componentRef = useRef(null);

  return (
    <>
      <ReactToPrint
        trigger={() => <button className="bg-green-500 text-white px-4 py-2 rounded-md">Imprimir</button>}
        content={() => componentRef.current}
      />

      <LoadingComponent var1={clientsLoading} var2={productsLoading} var3={sellOrdersLoading} />
      <div ref={componentRef} className='m-5'>
        {sellOrder && client ?
          <div className="SingleSellOrder w-full lg:w-4/5 mx-auto bg-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Nota de entrega</h2>
              <p className="text-2xl text-gray-700 font-medium">N° {sellOrder.orderNumber}</p>
            </div>
            <div className="section2">
              <div className='flex flex-col'>
                <p>Señores: <b>{client.name}</b></p>
                <p>RIF: {client.rif}</p>
              </div>
              <div className='date text-right'>
                <p><b>Fecha</b> : {DMYdate(sellOrder.orderDate)}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 font-medium mb-2">Dirección: {sellOrder.address}</p>
            </div>

            <div className="mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Productos</th>
                      <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Precio</th>
                      <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Cantidad</th>
                      <th className="py-2 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Total USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sellOrder.products.map((product, index) =>
                        <tr key={index} className="border border-gray-300">
                          <td className='py-2 px-4 border border-gray-300'>{getProductById(product.product_id)?.name + " x " + product.quantity}
                          </td>
                          <td id="price" className='py-2 px-4 border border-gray-300'>
                            {product.price}
                          </td>
                          <td className='py-2 px-4 border border-gray-300'>{product.quantity}</td>
                          <td className='py-2 px-4 border border-gray-300'>{product.price * product.quantity}</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-1 flex items-center justify-end gap-2">
              <div className="text-gray-700 font-medium mb-2">Sub total</div>
              <p id="subTotal" className="w-[100px] border border-gray-300 px-2 py-1">{sellOrder.subTotal.toFixed(2)}</p>
            </div>

            <div className="mb-1 flex items-center justify-end gap-2">
              <div className="text-gray-700 font-medium mb-2">IVA</div>
              <p id="iva" className="w-[100px] border border-gray-300 px-2 py-1">{(sellOrder.total - sellOrder.subTotal).toFixed(2)}</p>
            </div>

            <div className="mb-1 flex items-center justify-end gap-2">
              <div className="text-gray-700 font-medium mb-2">Total</div>
              <p id="total" className="w-[100px] border border-gray-300  px-2 py-1">{sellOrder.total.toFixed(2)}</p>
            </div>

          </div>
          : "Orden no encontrada"}

        <FooterSellOrder className='w-full lg:w-4/5 mx-auto' />
      </div>
    </>
  )
}