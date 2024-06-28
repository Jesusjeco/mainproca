import { Link, createFileRoute } from '@tanstack/react-router'
import { fetchClientById } from '../../apiCalls/clients'
import { Client } from "../../interfaces/Client"
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';

export const Route = createFileRoute('/purchaseOrders/$clientId')({
  loader: async ({ params: { clientId } }) => fetchClientById(clientId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Cliente no encontrado" />,
  component: SingleClient
})

function SingleClient() {
  const clientData = Route.useLoaderData<Client>()
  const [client, setClient] = useState<Client>(clientData);

  useEffect(() => { setClient(clientData) }, [clientData]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="min-w-1/2 md:min-w-0 lg:min-w-0 w-full md:w-1/2 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Datos de cliente</h2>
        <div className="mb-4">

          <div className="mt-1">
            <p id="rif" className="text-lg font-semibold text-gray-900">RIF: {client.rif}</p>
          </div>

          <div className="mt-1">
            <p id="name" className="text-lg font-semibold text-gray-900">Nombre: {client.name}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">Dirección fiscal</p>
          <div className="mt-1">
            <p id="office" className="text-sm text-gray-800">{client.legal_address}</p>
          </div>
        </div>

        {client.office && client.office !== "" ?
          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700">Sucursales</p>
            <div className="mt-1">
              <p id="office" className="text-sm text-gray-800">{client.office}</p>
            </div>
          </div>
          : ""
        }


        {client.description && client.description !== "" ?
          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700">Descripción</p>
            <div className="mt-1">
              <p id="description" className="text-sm text-gray-800">{client.description}</p>
            </div>
          </div>
          : ""
        }



        <div className="flex space-x-4 mt-4">
          <Link to={'/clients/edit/' + client._id} className="text-green-500 hover:text-green-700">
            <FaEdit />
          </Link>
        </div>

      </div>
    </div>
  )
}