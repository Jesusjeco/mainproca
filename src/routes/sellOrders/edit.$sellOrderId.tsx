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
import { NotFoundComponent } from "../../components/NotFoundComponent";
import { FetchErrorComponent } from "../../components/FetchErrorComponent";
import { SellOrder } from "../../interfaces/SellOrder";
import { factura_iva } from "../../utils/utils";

interface EditSellOrderProps {
  sellOrderId: string
}
export const Route = createFileRoute('/sellOrders/edit/$sellOrderId')({
  loader: async ({ params }: { params: EditSellOrderProps }) => { return params.sellOrderId },
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="SellOrdere no encontrado" />,
  component: EditSellOrder
});

function EditSellOrder() {
  const sellOrderId = Route.useLoaderData() as string
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const editSellOrderById = useSellOrdersStore(state => state.editSellOrderById);
  const getSellOrderById = useSellOrdersStore(state => state.getSellOrderById);
  const sellOrdersLoading = useSellOrdersStore(state => state.loading)

  const getClientById = useClientsStore(state => state.getClientById)
  const clients = useClientsStore(state => state.clients);
  const clientsLoading = useClientsStore(state => state.loading);

  const productsList = useProductsStore(state => state.products);
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
  const [orderDate, setOrderDate] = useState<Date>(new Date());
  const [address, setAddress] = useState<string>("");
  const [products, setProducts] = useState<ProductOrder[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0.00);
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      if (sellOrder) {
        setClient(await getClientById(sellOrder.client_id))
        setAddress(sellOrder.address)
        setProducts(sellOrder.products)
        setOrderDate(sellOrder.orderDate)
        setSubTotal(sellOrder.subTotal)
        setTotal(sellOrder.total)
        setDescription(sellOrder.description)
      }
    }//fetchData
    fetchData()
  }, [getClientById, sellOrder]);

  const clientResult = (newClient: Client | undefined) => {
    if (newClient) {
      if (newClient._id !== "")
        setClient(newClient);
      else {
        setClient(emptyClient);
        setAddress("");
      }
    }
  };

  const orderDateResult = (newDate: Date | null) => {
    if (newDate)
      setOrderDate(newDate);
  };

  const resultAddress = (newAddress: string) => {
    setAddress(newAddress);
  };

  const resultProducts = (newProductsOrder: ProductOrder[]) => {
    setProducts(newProductsOrder);
  };

  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    const newTotalPrice = products.map(product => product.price * product.quantity);
    setSubTotal(newTotalPrice.reduce((acumulator, currentValue) => acumulator + currentValue, 0));
  }, [products]);

  useEffect(() => {
    setTotal(subTotal * factura_iva)
  }, [subTotal])

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (client && sellOrder && products.length > 0) {
      const updatedSellOrder = {
        _id: sellOrderId,
        orderNumber: sellOrder.orderNumber,
        client_id: client._id,
        address,
        products,
        orderDate,
        subTotal,
        total,
        description
      };

      const response = await editSellOrderById(updatedSellOrder);
      if (response.success) {
        if (formRef.current)
          formRef.current.reset();
        navigate({ to: "/sellOrders/" + sellOrderId });
      } else {
        console.error('Failed to update sell order');
      }
    } else {
      alert("Ordern incomplpeta. Revizar cliente y productos")
    }
  };

  return (
    <>
      {clientsLoading && productsLoading && sellOrdersLoading && !client ? (
        <LoadingComponent var1={clientsLoading} var2={productsLoading} var3={sellOrdersLoading} />
      ) : client ? (
        <div className="w-full lg:w-4/5 mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6">Editar nota de entrega</h2>
          <form onSubmit={formHandler} ref={formRef} onKeyDown={AvoidEnterKeyPress}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="client_id" className="block text-gray-700 font-medium mb-2">Cliente</label>
                <ClientSelectList clients={clients} selectedClientId={client._id} clientResult={clientResult} className="w-full border border-gray-300 rounded-md p-2" label="client_id" />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="orderDate" className="block text-gray-700 font-medium mb-2">Fecha de orden</label>
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
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Dirección</label>
              {client ?
                <AddressSelectList client={client} selectedAddress={address} resultAddress={resultAddress} label="address" className="w-full border border-gray-300 rounded-md p-2" />
                : <div>Debe escoger un cliente</div>}
            </div>

            {productsList ?
              <div className="mb-4">
                <MultiProductOrder products={productsList} initialProductOrders={products} resultProducts={resultProducts} />
              </div>
              : <div>No se encuentran productos para mostrar</div>
            }

            <div className="mb-4 grid grid-cols-[2fr_1fr]">
              <div className="flex flex-col">
                <label htmlFor="description">Descripción y notas</label>
                <textarea name="description" id="description" rows={5}
                  className="border border-gray-300 p-2"
                  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>

              <div>
                <div className="flex items-center justify-end gap-2">
                  <div className="text-gray-700 font-medium">
                    Sub total</div>
                  <p id="subTotal" className="w-[100px] border border-gray-300 p-2">
                    {subTotal.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <div className="text-gray-700 font-medium">
                    IVA</div>
                  <p id="subTotal" className="w-[100px] border border-gray-300 p-2">
                    {(subTotal * (factura_iva - 1)).toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <div className="text-gray-700 font-medium">
                    Total</div>
                  <p id="subTotal" className="w-[100px] border border-gray-300 p-2">
                    {total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                Guardar
              </button>
            </div>
          </form>
        </div>
      ) : "Cargando clientes"
      }
    </>
  );
}