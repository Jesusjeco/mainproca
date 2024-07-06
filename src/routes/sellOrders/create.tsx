import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useClientsStore } from "../../store/clientStore";
import { LoadingComponent } from "../../components/LoadingComponent";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProductsStore } from "../../store/productStore";
import { Client } from "../../interfaces/Client";
import { Product } from "../../interfaces/Product";
import { ProductOrder, emptyProductOrder } from "../../interfaces/SellOrder";
import { createSellOrder } from "../../apiCalls/sellOrders";

export const Route = createFileRoute('/sellOrders/create')({
  component: CreateSellOrder
})

function CreateSellOrder() {
  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const clients = useClientsStore(state => state.clients);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const products = useProductsStore(state => state.products);
  const productsLoading = useProductsStore(state => state.loading);

  //Variables used to create the Purchase order

  // Client ID
  const [clientID, setClientID] = useState<string>("");
  const clientHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setClientID(e.target.value);
  }//clientHandler

  //Client address
  const [address, setAddress] = useState<string>("");
  const [addressArray, setAddressArray] = useState<string[]>([]);
  useEffect(() => {
    const client = clients.find((client) => client._id === clientID);
    if (client) {
      const legalAddress = client.legal_address;
      setAddress(legalAddress);
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
  }, [clientID]);

  // Products array
  const [selectedProducts, setSelectedProducts] = useState<ProductOrder[]>([])
  const addNewProduct = () => {
    const auxProductList = [...selectedProducts, emptyProductOrder];
    setSelectedProducts(auxProductList);
  }
  const setSelectedProductsHandler = (productData: ProductOrder, index: number) => {
    const auxProductList = [...selectedProducts];
    auxProductList[index] = productData;
    setSelectedProducts(auxProductList);
  }

  // Total product price
  const [totalProductPriceArray, setTotalProductPriceArray] = useState<number[]>([]);
  const setTotalProductPriceArrayHandler = (productCost: number, index: number) => {
    const auxTotalPrice = [...totalProductPriceArray];
    auxTotalPrice[index] = productCost;
    setTotalProductPriceArray(auxTotalPrice);
  }

  //Purchase Price
  const [purchasePrice, setPurchasePrice] = useState<number>(0.00);
  useEffect(() => {
    setPurchasePrice(
      totalProductPriceArray.reduce((acumulator, currentValue) => acumulator + currentValue, 0)
    );
  }, [totalProductPriceArray]);


  //Order date
  const [orderDate, setOrderDate] = useState<Date>(new Date)
  const setOrderDateHandler = (date: Date | null) => {
    if (date === null)
      date = new Date();

    setOrderDate(date);
  }

  //Form ref and navigation
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  // Form handler
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSellOrder = {
      client: clientID,
      address: address,
      products: selectedProducts,
      totalPrice: purchasePrice,
      orderDate: orderDate
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

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  return (
    <>
      <LoadingComponent var1={clientsLoading} var2={productsLoading} />
      <div className="w-full lg:w-4/5 mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Crear orden de compra</h2>
        <form onSubmit={formHandler} ref={formRef}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="mb-4">
              <ClientSelectList clients={clients} clientHandler={clientHandler} />
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
              <select name="address" id="address"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setAddress(e.target.value)}>
                {
                  addressArray.map((address, index) =>
                    <option key={index} value={address}>{address}</option>
                  )
                }
              </select>
              : <p>Escoja un cliente para cargar las direcciones</p>
            }
          </div>

          <div className="mb-4">
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
          </div>

          <div className="mb-4">
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
            required
            onChange={clientHandler}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>{client.rif} - {client.name}</option>
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
  setSelectedProductsHandler: (productData: ProductOrder, index: number) => void,
  setProductTotalPrice: (totalProductPrice: number, index: number) => void,
  index: number
}
function ProductSelectList({ products, setSelectedProductsHandler, setProductTotalPrice, index }: ProductSelectListProps) {
  //product
  const [productId, setProductId] = useState<string>("");
  const productIdHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    //Updating price using the id of the product
    const auxProduct = products.find((product) => product._id === value);
    if (auxProduct) {
      const price = auxProduct.price;
      setPrice(price)
      const maxQuantity = auxProduct.quantity
      setMaxQuantity(maxQuantity);
    }

    setProductId(value);
  }//productIdHandler

  //price and quantity
  const [price, setPrice] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const setPriceHandler = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value } = e.target;
    setPrice(Number(value));
  }

  //quantity
  const [quantity, setQuantity] = useState<number>(1)
  const setQuantityHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value === maxQuantity) {
      setMessage(true);
    } else { setMessage(false); }
    setQuantity(value);
  }//setQuantityHandler

  //Total cost
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0.00);
  useEffect(() => {
    setTotalProductPrice(price * quantity);
  }, [price, quantity]);

  //Sending the total cost to father component
  useEffect(() => {
    setProductTotalPrice(totalProductPrice, index);
  }, [totalProductPrice]);



  const [componentProduct, setComponentProduct] = useState<ProductOrder>(emptyProductOrder)
  useEffect(() => {
    setComponentProduct(
      {
        ...componentProduct,
        product: productId,
        price: price,
        quantity: quantity
      }
    )
  }, [productId, price, quantity]);

  const [message, setMessage] = useState<boolean>(false);

  //Sending the component
  useEffect(() => {
    setSelectedProductsHandler(componentProduct, index);
  }, [componentProduct]);
  return (
    <>
      {
        products.length > 0 ? (
          <>
            <div className="grid gap-2 md:grid-cols-4 items-center">
              <select
                name="product"
                id="product"
                required
                onChange={productIdHandler}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>{product.name} - {product.price}$</option>
                ))}
              </select>
              <div className="relative w-full">
                <input
                  type="number"
                  step={0.01}
                  min={0}
                  required
                  name="price"
                  id="price"
                  value={price}
                  onChange={setPriceHandler}
                  className="w-full border border-gray-300 rounded-md p-2 pr-10"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step={1}
                  min={0}
                  required
                  name="quantity"
                  id="quantity"
                  max={maxQuantity}
                  value={quantity}
                  onChange={setQuantityHandler}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {message ?
                  <p className="absolute top-1 bottom-1 right-[25%] flex items-center bg-red-500 px-4 font-bold">MAX</p>
                  : ""
                }
              </div>

              <input disabled required
                type="number" name="totalProductPrice" id="totalProductPrice"
                value={totalProductPrice} className="w-full border border-gray-300 rounded-md p-2" />
            </div>
          </>
        ) : (
          <p className="text-red-500">Product list is empty</p>
        )
      }
    </>
  )
}