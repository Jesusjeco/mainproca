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
import { NotFoundComponent } from "../../components/NotFoundComponent";
import { FetchErrorComponent } from "../../components/FetchErrorComponent";
import { PurchaseOrder } from "../../interfaces/PurchaseOrder";
import { ProductsOrderComponent } from "../../components/productOrder/ProductsOrderComponent";

interface EditPurchaseOrderProps {
  purchaseOrderId: string
}
export const Route = createFileRoute('/purchaseOrders/edit/$purchaseOrderId')({
  loader: async ({ params }: { params: EditPurchaseOrderProps }) => { return params.purchaseOrderId },
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="PurchaseOrdere no encontrado" />,
  component: EditPurchaseOrder
});

function EditPurchaseOrder() {
  const purchaseOrderId = Route.useLoaderData() as string
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const fetchPurchaseOrders = usePurchaseOrdersStore(state => state.fetchPurchaseOrders)
  const editPurchaseOrderById = usePurchaseOrdersStore(state => state.editPurchaseOrderById);
  const getPurchaseOrderById = usePurchaseOrdersStore(state => state.getPurchaseOrderById);
  const purchaseOrdersLoading = usePurchaseOrdersStore(state => state.loading)

  const fetchClients = useClientsStore(state => state.fetchClients);
  const getClientById = useClientsStore(state => state.getClientById)
  const clients = useClientsStore(state => state.clients);
  const clientsLoading = useClientsStore(state => state.loading);

  const productsOrderLoading = useProductsStore(state => state.loading);

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | undefined>(undefined)

  //orderNumber
  const [orderNumber, setOrderNumber] = useState<string>("")

  useEffect(() => {
    fetchPurchaseOrders();
    fetchClients();
  }, []);

  useEffect(() => {
    if (!purchaseOrdersLoading && !clientsLoading && purchaseOrderId)
      setPurchaseOrder(getPurchaseOrderById(purchaseOrderId))
  }, [purchaseOrdersLoading, clientsLoading, productsOrderLoading, purchaseOrderId])

  const [client, setClient] = useState<Client | undefined>(undefined);
  const [orderDate, setOrderDate] = useState<Date>(new Date());


  //productsOrder
  const [productsOrder, setProductsOrder] = useState<ProductOrder[]>([])
  const setProductsOrderResult = (newProductsOrder: ProductOrder[]) => {
    if (newProductsOrder)
      setProductsOrder(newProductsOrder)
    else
      setProductsOrder([])
  }//setProductsOrderResult

  useEffect(() => {
    if (purchaseOrder) {
      setOrderNumber(purchaseOrder.orderNumber)
      setClient(getClientById(purchaseOrder.client_id))
      setProductsOrder(purchaseOrder.productsOrder)
      setOrderDate(purchaseOrder.orderDate)
      setDescription(purchaseOrder.description)
    }
  }, [purchaseOrder]);

  const clientResult = (newClient: Client | undefined) => {
    if (newClient) {
      if (newClient._id !== "")
        setClient(newClient);
      else {
        setClient(undefined);
      }
    }
  };

  //OrderDate
  const orderDateResult = (newDate: Date | null) => {
    if (newDate)
      setOrderDate(newDate);
  };

  const [description, setDescription] = useState<string>("")

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (client && purchaseOrder && productsOrder.length > 0) {
      const updatedPurchaseOrder = {
        _id: purchaseOrderId,
        orderNumber,
        client_id: client._id,
        productsOrder,
        orderDate,
        description
      };

      const response = await editPurchaseOrderById(updatedPurchaseOrder);
      if (response.success) {
        if (formRef.current)
          formRef.current.reset();
        navigate({ to: "/purchaseOrders/" + purchaseOrderId });
      } else {
        console.error('Failed to update sell order');
      }
    } else {
      alert("Ordern incomplpeta. Revizar cliente y productos")
    }
  };

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsOrderLoading} var3={purchaseOrdersLoading} />
      <div className="w-full lg:w-4/5 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Editar factura de compra</h2>
        {client ?
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
                <label htmlFor="client_id" className="block text-gray-700 font-medium mb-2">Proveedor</label>
                <ClientSelectList clients={clients} selectedClientId={client._id} clientResult={clientResult} className="w-full border border-gray-300 rounded-md p-2" label="client_id" />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="orderDate" className="block text-gray-700 font-medium mb-2">Fecha de factura</label>
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
              <ProductsOrderComponent setProductsOrderResult={setProductsOrderResult} initialProductsOrder={productsOrder} />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea rows={4} id="description" name="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                Guardar
              </button>
            </div>
          </form>
          : ""}
      </div>
    </>
  );
}

export default EditPurchaseOrder;