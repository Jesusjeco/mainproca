import { Link, createFileRoute } from '@tanstack/react-router'
import { Client } from "../../interfaces/Client"
import { FaEdit } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useClientsStore } from '../../store/clientStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { useEffect, useState } from 'react';

interface SingleClientProps {
  clientId: string
}
export const Route = createFileRoute('/clients/$clientId')({ 
  loader: ({ params }: { params: SingleClientProps }) => { return params.clientId },
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Cliente no encontrado" />,
  component: SingleClient
})

function SingleClient() {
  const clientId = Route.useLoaderData() as string
  const fetchAllClients = useClientsStore(state => state.fetchClients)
  const getClientByID = useClientsStore(state => state.getClientById)
  const loadingClients = useClientsStore(state => state.loading)
  useEffect(() => {
    fetchAllClients()
  }, [])
  const [client, setClient] = useState<Client | undefined>(undefined)
  useEffect(() => {
    if (clientId !== "" && !loadingClients)
      setClient(getClientByID(clientId))
  }, [clientId, loadingClients])

  return (
    <>
      <LoadingComponent var1={loadingClients} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Datos de cliente</h2>
          {client ?
            <>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900">RIF: {client.rif}</p>
                <p className="text-lg font-semibold text-gray-900">Nombre: {client.name}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700">Numero</p>
                <p className="mt-1 text-sm text-gray-800">{client.number ?? "Sin número registrado"}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700">Correo</p>
                <p className="mt-1 text-sm text-gray-800">{client.email ?? "Sin correo registrado"}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700">Dirección fiscal</p>
                <p className="mt-1 text-sm text-gray-800">{client.legal_address}</p>
              </div>

              {client.offices.length > 0 ? (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700">Sucursales</p>
                  {client.offices.map((office, index) => (
                    <p key={index} className="mt-1 text-sm text-gray-800">{office.address}</p>
                  ))}
                </div>
              ) : (
                <div className="mb-6 text-sm text-gray-800">Sin sucursales</div>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700">Descripción</p>
                <p className="mt-1 text-sm text-gray-800">{client.description ?? "Sin descripción"}</p>
              </div>

              <div className="flex justify-center mt-6">
                <Link to={'/clients/edit/' + client._id} className="text-blue-500 hover:text-blue-700">
                  <FaEdit size={24} />
                </Link>
              </div>
            </>
            : <div>Cliente no encontrado</div>}
        </div>
      </div>
    </>
  )
}
