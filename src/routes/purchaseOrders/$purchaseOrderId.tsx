import { createFileRoute, Link } from '@tanstack/react-router'
import { PurchaseOrder } from "../../interfaces/PurchaseOrder"
import { useEffect, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { DMYdate } from '../../utils/dates';
import { useClientsStore } from '../../store/clientStore';
import { useProductsStore } from '../../store/productStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { Client } from '../../interfaces/Client';
import { usePurchaseOrdersStore } from '../../store/purchaseOrderStore';
import { FaEdit } from 'react-icons/fa';

interface SinglePurchaseOrderProps {
  purchaseOrderId: string
}
export const Route = createFileRoute('/purchaseOrders/$purchaseOrderId')({
  loader: async ({ params }: { params: SinglePurchaseOrderProps }) => { return params.purchaseOrderId },
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="PurchaseOrdere no encontrado" />,
  component: SinglePurchaseOrder
})

function SinglePurchaseOrder() {
  const purchaseOrderId = Route.useLoaderData() as string

  // Using Zustand Sell Order store
  const fetchPurchaseOrders = usePurchaseOrdersStore(state => state.fetchPurchaseOrders)
  const purchaseOrdersLoading = usePurchaseOrdersStore(state => state.loading)
  const getPurchaseOrderById = usePurchaseOrdersStore(state => state.getPurchaseOrderById)

  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const getClientById = useClientsStore(state => state.getClientById);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const getProductById = useProductsStore(state => state.getProductById);
  const productsLoading = useProductsStore(state => state.loading);

  useEffect(() => {
    fetchPurchaseOrders()
    fetchClients();
    fetchProducts();
  }, []);

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | undefined>(undefined)
  useEffect(() => {
    if (!purchaseOrdersLoading && !clientsLoading && !productsLoading && purchaseOrderId) {
      setPurchaseOrder(getPurchaseOrderById(purchaseOrderId))
    }
  }, [purchaseOrdersLoading, clientsLoading, productsLoading, purchaseOrderId])

  const [client, setClient] = useState<Client | undefined>(undefined);
  useEffect(() => {
    if (!clientsLoading && purchaseOrder)
      setClient(getClientById(purchaseOrder.client_id))
  }, [clientsLoading, purchaseOrder])

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} var3={purchaseOrdersLoading} />

      <div className='w-[150px]'>
        <Link to={'/purchaseOrders/edit/' + purchaseOrderId} className="flex items-center gap-3 bg-green-500 text-white px-4 py-1 rounded-md">
          Editar orden <FaEdit />
        </Link>
      </div>

      <div className='m-5'>
        {purchaseOrder && client ?
          <div className="SinglePurchaseOrder w-full lg:w-4/5 mx-auto bg-white">
            <div className='header'>
              <div className="">
                <p className="font-bold">Nota de entrega</p>
                <p className="text-gray-700 font-medium">N° {purchaseOrder.orderNumber}</p>
                <div className='date'>
                  <p><b>Fecha</b> : {DMYdate(purchaseOrder.orderDate)}</p>
                </div>
              </div>
            </div>
            <div className="section2">
              <div className='flex flex-col'>
                <p className='text-lg'>Señores: <b>{client.name}</b></p>
                <p className='text-sm'>RIF: {client.rif}</p>
              </div>
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
                      purchaseOrder.productsOrder.map((product, index) =>
                        <tr key={index} className="border border-gray-300">
                          <td className='py-1 px-4 border border-gray-300'>{getProductById(product.product_id)?.name}
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
          </div>
          : "Orden no encontrada"}
      </div >
    </>
  )
}