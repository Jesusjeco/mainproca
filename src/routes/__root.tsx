import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
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
        <Link to="/sells" activeProps={{ className: 'font-bold', }}>
          Ventas
        </Link>
        <Link to="/purchaseOrders" activeProps={{ className: 'font-bold', }}>
          Compras
        </Link>
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})
