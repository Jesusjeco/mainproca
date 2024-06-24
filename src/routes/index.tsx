import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center">
        <Link to='/products' className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-xl hover:bg-blue-700">
          Inventario
        </Link>
        <Link to='/clients' className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-xl hover:bg-blue-700">
          Clientes
        </Link>
        <Link to='/sells' className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-xl hover:bg-blue-700">
          Ventas
        </Link>
        <Link to='/purchasing' className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-xl hover:bg-blue-700">
          Compras
        </Link>
      </div>
    </div>
  )
}
