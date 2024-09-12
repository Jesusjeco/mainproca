import { createFileRoute, Link } from '@tanstack/react-router'
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
import { FaEdit, FaPrint } from 'react-icons/fa';

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
  const sellOrdersLoading = useSellOrdersStore(state => state.loading)
  const getSellOrderById = useSellOrdersStore(state => state.getSellOrderById)

  // Using Zustand Client store
  const getClientById = useClientsStore(state => state.getClientById);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const getFetchedProductById = useProductsStore(state => state.getFetchedProductById);
  const productsLoading = useProductsStore(state => state.loading);

  const [sellOrder, setSellOrder] = useState<SellOrder | undefined>(undefined)
  useEffect(() => {
    const fetchData = async (sellOrderId: string) => {
      const sellOrderById = await getSellOrderById(sellOrderId);
      if (sellOrderById)
        setSellOrder(sellOrderById)
    }
    fetchData(sellOrderId);
  }, [getSellOrderById, sellOrderId])

  const [client, setClient] = useState<Client | undefined>(undefined);
  useEffect(() => {
    const originalTitle = import.meta.env.VITE_APP_NAME;
    const fetchData = async () => {
      if (sellOrder) {
        setClient(await getClientById(sellOrder.client_id))
        document.title = "Mainproca venta " + sellOrder.orderNumber;
      }
    }
    fetchData()

    // Cleanup function to restore the original title
    return () => {
      document.title = originalTitle;
    };
  }, [getClientById, sellOrder])

  //Reference used to print the component
  const componentRef = useRef(null);

  return (
    <>
      {clientsLoading && productsLoading && sellOrdersLoading && !sellOrder && !client ? (
        <LoadingComponent var1={clientsLoading} var2={productsLoading} var3={sellOrdersLoading} />
      ) : sellOrder && client ? (
        <>
          <div className="buttons">
            <ReactToPrint
              trigger={() => <button className="flex items-center gap-3 bg-green-500 text-white px-4 py-1 rounded-md">Imprimir <FaPrint /></button>}
              content={() => componentRef.current}
            />
            <div>
              <Link to={'/sellOrders/edit/' + sellOrderId} className="flex items-center gap-3 bg-green-500 text-white px-4 py-1 rounded-md">
                Editar orden <FaEdit />
              </Link>
            </div>
          </div>

          <div ref={componentRef} className='m-5'>
            <div className="SingleSellOrder w-full lg:w-4/5 mx-auto bg-white">
              <div className='header'>
                <div className='logo'>
                  <img src="/mainproca_logo.png" alt="" />
                </div>
                <div className="">
                  <p className="font-bold">Nota de entrega</p> <p className="text-gray-700 font-medium">N° {sellOrder.orderNumber}</p>
                  <div className='date'>
                    <p><b>Fecha</b> : {DMYdate(sellOrder.orderDate)}</p>
                  </div>
                </div>
              </div>
              <div className="section2">
                <div className='flex flex-col'>
                  <p className='text-lg'>Señores: <b>{client.name}</b></p>
                  <p className='text-sm'>RIF: {client.rif}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">Dirección: {sellOrder.address}</p>
              </div>

              <div className="mb-2 text-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="py-1 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Productos</th>
                        <th className="py-1 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Precio</th>
                        <th className="py-1 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Cantidad</th>
                        <th className="py-1 px-4 border border-gray-300 bg-gray-100 text-left text-gray-700">Total USD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sellOrder.products.map((product, index) =>
                          <tr key={index} className="border border-gray-300">
                            <td className='py-1 px-4 border border-gray-300'>{getFetchedProductById(product.product_id)?.name}
                            </td>
                            <td id="price" className='py-1 px-4 border border-gray-300'>
                              {product.price}
                            </td>
                            <td className='py-1 px-4 border border-gray-300 text-center'>{product.quantity}</td>
                            <td className='py-1 px-4 border border-gray-300'>{(product.price * product.quantity).toFixed(2)}</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className='text-sm grid items-end grid-cols-[2fr_1fr_1fr]'>
                <div>
                  <p>{sellOrder.description ?? ""}</p>
                </div>

                <div className='text-center'>
                  {(sellOrder.subTotal + ((sellOrder.total - sellOrder.subTotal) * 0.25)).toFixed(2)}
                </div>

                <div>
                  <div className="flex items-center justify-end gap-2">
                    <div className="text-gray-700 font-medium">Sub total</div>
                    <p id="subTotal" className="w-[100px] border-b border-gray-300 ">{sellOrder.subTotal.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <div className="text-gray-700 font-medium">IVA</div>
                    <p id="iva" className="w-[100px] border-b border-gray-300">{(sellOrder.total - sellOrder.subTotal).toFixed(2)}</p>
                  </div>

                  <div className="mb-1 flex items-center justify-end gap-2">
                    <div className="text-gray-700 font-medium">Total</div>
                    <p id="total" className="w-[100px] border-b border-gray-300 ">{sellOrder.total.toFixed(2)}</p>
                  </div>
                </div>

              </div>
            </div>

            <FooterSellOrder className='w-full lg:w-4/5 mx-auto' />
          </div>
        </>
      ) : "Orden no encontrada"}
    </>
  )
}