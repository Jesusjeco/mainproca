/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as BoilerplateImport } from './routes/boilerplate'
import { Route as IndexImport } from './routes/index'
import { Route as SellsIndexImport } from './routes/sells/index'
import { Route as PurchaseOrdersIndexImport } from './routes/purchaseOrders/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as ClientsIndexImport } from './routes/clients/index'
import { Route as PurchaseOrdersCreateImport } from './routes/purchaseOrders/create'
import { Route as PurchaseOrdersPurchaseOrderIdImport } from './routes/purchaseOrders/$purchaseOrderId'
import { Route as ProductsCreateImport } from './routes/products/create'
import { Route as ProductsProductIdImport } from './routes/products/$productId'
import { Route as ClientsCreateImport } from './routes/clients/create'
import { Route as ClientsClientIdImport } from './routes/clients/$clientId'
import { Route as PurchaseOrdersEditPurchaseOrderIdImport } from './routes/purchaseOrders/edit.$purchaseOrderId'
import { Route as ProductsEditProductIdImport } from './routes/products/edit.$productId'
import { Route as ClientsEditClientIdImport } from './routes/clients/edit.$clientId'

// Create/Update Routes

const BoilerplateRoute = BoilerplateImport.update({
  path: '/boilerplate',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SellsIndexRoute = SellsIndexImport.update({
  path: '/sells/',
  getParentRoute: () => rootRoute,
} as any)

const PurchaseOrdersIndexRoute = PurchaseOrdersIndexImport.update({
  path: '/purchaseOrders/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const ClientsIndexRoute = ClientsIndexImport.update({
  path: '/clients/',
  getParentRoute: () => rootRoute,
} as any)

const PurchaseOrdersCreateRoute = PurchaseOrdersCreateImport.update({
  path: '/purchaseOrders/create',
  getParentRoute: () => rootRoute,
} as any)

const PurchaseOrdersPurchaseOrderIdRoute =
  PurchaseOrdersPurchaseOrderIdImport.update({
    path: '/purchaseOrders/$purchaseOrderId',
    getParentRoute: () => rootRoute,
  } as any)

const ProductsCreateRoute = ProductsCreateImport.update({
  path: '/products/create',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductIdRoute = ProductsProductIdImport.update({
  path: '/products/$productId',
  getParentRoute: () => rootRoute,
} as any)

const ClientsCreateRoute = ClientsCreateImport.update({
  path: '/clients/create',
  getParentRoute: () => rootRoute,
} as any)

const ClientsClientIdRoute = ClientsClientIdImport.update({
  path: '/clients/$clientId',
  getParentRoute: () => rootRoute,
} as any)

const PurchaseOrdersEditPurchaseOrderIdRoute =
  PurchaseOrdersEditPurchaseOrderIdImport.update({
    path: '/purchaseOrders/edit/$purchaseOrderId',
    getParentRoute: () => rootRoute,
  } as any)

const ProductsEditProductIdRoute = ProductsEditProductIdImport.update({
  path: '/products/edit/$productId',
  getParentRoute: () => rootRoute,
} as any)

const ClientsEditClientIdRoute = ClientsEditClientIdImport.update({
  path: '/clients/edit/$clientId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/boilerplate': {
      id: '/boilerplate'
      path: '/boilerplate'
      fullPath: '/boilerplate'
      preLoaderRoute: typeof BoilerplateImport
      parentRoute: typeof rootRoute
    }
    '/clients/$clientId': {
      id: '/clients/$clientId'
      path: '/clients/$clientId'
      fullPath: '/clients/$clientId'
      preLoaderRoute: typeof ClientsClientIdImport
      parentRoute: typeof rootRoute
    }
    '/clients/create': {
      id: '/clients/create'
      path: '/clients/create'
      fullPath: '/clients/create'
      preLoaderRoute: typeof ClientsCreateImport
      parentRoute: typeof rootRoute
    }
    '/products/$productId': {
      id: '/products/$productId'
      path: '/products/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof ProductsProductIdImport
      parentRoute: typeof rootRoute
    }
    '/products/create': {
      id: '/products/create'
      path: '/products/create'
      fullPath: '/products/create'
      preLoaderRoute: typeof ProductsCreateImport
      parentRoute: typeof rootRoute
    }
    '/purchaseOrders/$purchaseOrderId': {
      id: '/purchaseOrders/$purchaseOrderId'
      path: '/purchaseOrders/$purchaseOrderId'
      fullPath: '/purchaseOrders/$purchaseOrderId'
      preLoaderRoute: typeof PurchaseOrdersPurchaseOrderIdImport
      parentRoute: typeof rootRoute
    }
    '/purchaseOrders/create': {
      id: '/purchaseOrders/create'
      path: '/purchaseOrders/create'
      fullPath: '/purchaseOrders/create'
      preLoaderRoute: typeof PurchaseOrdersCreateImport
      parentRoute: typeof rootRoute
    }
    '/clients/': {
      id: '/clients/'
      path: '/clients'
      fullPath: '/clients'
      preLoaderRoute: typeof ClientsIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
    '/purchaseOrders/': {
      id: '/purchaseOrders/'
      path: '/purchaseOrders'
      fullPath: '/purchaseOrders'
      preLoaderRoute: typeof PurchaseOrdersIndexImport
      parentRoute: typeof rootRoute
    }
    '/sells/': {
      id: '/sells/'
      path: '/sells'
      fullPath: '/sells'
      preLoaderRoute: typeof SellsIndexImport
      parentRoute: typeof rootRoute
    }
    '/clients/edit/$clientId': {
      id: '/clients/edit/$clientId'
      path: '/clients/edit/$clientId'
      fullPath: '/clients/edit/$clientId'
      preLoaderRoute: typeof ClientsEditClientIdImport
      parentRoute: typeof rootRoute
    }
    '/products/edit/$productId': {
      id: '/products/edit/$productId'
      path: '/products/edit/$productId'
      fullPath: '/products/edit/$productId'
      preLoaderRoute: typeof ProductsEditProductIdImport
      parentRoute: typeof rootRoute
    }
    '/purchaseOrders/edit/$purchaseOrderId': {
      id: '/purchaseOrders/edit/$purchaseOrderId'
      path: '/purchaseOrders/edit/$purchaseOrderId'
      fullPath: '/purchaseOrders/edit/$purchaseOrderId'
      preLoaderRoute: typeof PurchaseOrdersEditPurchaseOrderIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  BoilerplateRoute,
  ClientsClientIdRoute,
  ClientsCreateRoute,
  ProductsProductIdRoute,
  ProductsCreateRoute,
  PurchaseOrdersPurchaseOrderIdRoute,
  PurchaseOrdersCreateRoute,
  ClientsIndexRoute,
  ProductsIndexRoute,
  PurchaseOrdersIndexRoute,
  SellsIndexRoute,
  ClientsEditClientIdRoute,
  ProductsEditProductIdRoute,
  PurchaseOrdersEditPurchaseOrderIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/boilerplate",
        "/clients/$clientId",
        "/clients/create",
        "/products/$productId",
        "/products/create",
        "/purchaseOrders/$purchaseOrderId",
        "/purchaseOrders/create",
        "/clients/",
        "/products/",
        "/purchaseOrders/",
        "/sells/",
        "/clients/edit/$clientId",
        "/products/edit/$productId",
        "/purchaseOrders/edit/$purchaseOrderId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/boilerplate": {
      "filePath": "boilerplate.tsx"
    },
    "/clients/$clientId": {
      "filePath": "clients/$clientId.tsx"
    },
    "/clients/create": {
      "filePath": "clients/create.tsx"
    },
    "/products/$productId": {
      "filePath": "products/$productId.tsx"
    },
    "/products/create": {
      "filePath": "products/create.tsx"
    },
    "/purchaseOrders/$purchaseOrderId": {
      "filePath": "purchaseOrders/$purchaseOrderId.tsx"
    },
    "/purchaseOrders/create": {
      "filePath": "purchaseOrders/create.tsx"
    },
    "/clients/": {
      "filePath": "clients/index.tsx"
    },
    "/products/": {
      "filePath": "products/index.tsx"
    },
    "/purchaseOrders/": {
      "filePath": "purchaseOrders/index.tsx"
    },
    "/sells/": {
      "filePath": "sells/index.tsx"
    },
    "/clients/edit/$clientId": {
      "filePath": "clients/edit.$clientId.tsx"
    },
    "/products/edit/$productId": {
      "filePath": "products/edit.$productId.tsx"
    },
    "/purchaseOrders/edit/$purchaseOrderId": {
      "filePath": "purchaseOrders/edit.$purchaseOrderId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
