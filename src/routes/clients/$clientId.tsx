import { Link, createFileRoute } from '@tanstack/react-router'
import { Client } from "../../interfaces/Client"
import { FaEdit } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import { useClientsStore } from '../../store/clientStore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { useEffect, useState } from 'react';
import ClientRecentSellOrder from '../../components/clients/ClientRecentSellOrder';
import ClientRecentPurchaseOrder from '../../components/clients/ClientRecentPurchaseOrder';

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
  const getClientByID = useClientsStore(state => state.getClientById)
  const loadingClients = useClientsStore(state => state.loading)
  const [client, setClient] = useState<Client | undefined>(undefined)
  useEffect(() => {
    const fetchData = async () => {
      setClient(await getClientByID(clientId))
    }
    fetchData()

  }, [clientId, getClientByID])

  return (
    <>
      {loadingClients && !client ? (
        <LoadingComponent var1={loadingClients} />
      )
        : client ? (
          <div className="min-h-screen bg-gray-100">
            <div className="w-full lg:w-4/5 mx-auto bg-white p-4 rounded-lg shadow-lg">
              <div className="mb-3 flex items-center gap-3">
                <p className="text-2xl font-bold mb-3 text-gray-800">Datos de cliente</p>
                <div className="flex space-x-4">
                  <Link to={'/clients/edit/' + client._id} className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={24} />
                  </Link>
                </div>
              </div>

              <div className="mb-3 ">
                <p className="text-lg font-semibold text-gray-900">RIF: {client.rif}</p>
                <p className="text-lg font-semibold text-gray-900">Nombre: {client.name}</p>
              </div>

              <div className="mb-3">
                <p><b>Número:</b> {client.number ?? "Sin número registrado"}</p>
              </div>

              <div className="mb-3">
                <p><b>Correo:</b> {(client.email !== "") ? client.email : "Sin correo registrado"}</p>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700">Dirección fiscal</p>
                <p className="mt-1 text-sm text-gray-800">{client.legal_address}</p>
              </div>

              {client.offices.length > 0 ? (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">Sucursales</p>
                  <ul className="list-disc list-inside">
                    {client.offices.map((office, index) => (
                      <li key={index} className="mt-1 text-sm text-gray-800">{office.address}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mb-3 text-sm text-gray-800">Sin sucursales</div>
              )}

              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700">Descripción</p>
                <p className="mt-1 text-sm text-gray-800">{client.description ?? "Sin descripción"}</p>
              </div>

            </div>
            <ClientRecentSellOrder clientId={clientId} />
            <ClientRecentPurchaseOrder clientId={clientId} />
          </div>
        ) : <div>Cliente no encontrado</div>}
    </>
  )
}
