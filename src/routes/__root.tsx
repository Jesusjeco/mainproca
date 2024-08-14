import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { useSellOrdersStore } from '../store/sellOrderStore';
import { useClientsStore } from '../store/clientStore';
import { useProductsStore } from '../store/productStore';
import { useEffect } from 'react';
import { LoadingComponent } from '../components/LoadingComponent';
import { usePurchaseOrdersStore } from '../store/purchaseOrderStore';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: MainComponent
})

function MainComponent() {
  // Using Zustand Product store
  const fetchProducts = useProductsStore(state => state.fetchProducts);
  const productsLoading = useProductsStore(state => state.loading);

  // Using Zustand Client store
  const fetchClients = useClientsStore(state => state.fetchClients);
  const clientsLoading = useClientsStore(state => state.loading);

  // Using Zustand Sell Order store
  const fetchSellOrders = useSellOrdersStore(state => state.fetchSellOrders)
  const sellOrdersLoading = useSellOrdersStore(state => state.loading)

  // Using Zustand Purchase Order store
  const fetchPurchaseOrders = usePurchaseOrdersStore(state => state.fetchPurchaseOrders)
  const purchaseOrdersLoading = usePurchaseOrdersStore(state => state.loading)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts()
        await fetchClients()
        await fetchSellOrders()
        await fetchPurchaseOrders()
      } catch (error) {
        console.error("Fail doing the fetch", error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <LoadingComponent var1={productsLoading} var2={clientsLoading} var3={sellOrdersLoading} var4={purchaseOrdersLoading} />
      <div className="p-2 flex gap-2">
        <Link to="/" activeProps={{ className: 'font-bold', }}>
          Inicio
        </Link>
        <Link to="/products" activeProps={{ className: 'font-bold', }}>
          Inventario
        </Link>
        <Link to="/clients" activeProps={{ className: 'font-bold', }}>
          Clientes
        </Link>
        <Link to="/purchaseOrders" activeProps={{ className: 'font-bold', }}>
          Compras
        </Link>
        <Link to="/sellOrders" activeProps={{ className: 'font-bold', }}>
          Ventas
        </Link>
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}