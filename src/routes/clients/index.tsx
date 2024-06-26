import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { deleteClientById, fetchAllClients } from "../../apiCalls/clients"
import "./clients.pcss"
import { Client } from "../../interfaces/Client"
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FetchErrorComponent } from '../../components/FetchErrorComponent';
import { NotFoundComponent } from '../../components/NotFoundComponent';

export const Route = createFileRoute('/clients/')({
  loader: fetchAllClients,
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Cliente no encontrado" />,
  component: Clients,
})

function Clients() {
  const allClients = Route.useLoaderData<Client[]>();
  const navigate = useNavigate();

  const deleteClientHandler = async (clientId: string) => {
    const response = await deleteClientById(clientId);

    if (response?.status === 200) {
      navigate({ to: "/clients" });
    }
  }

  return (
    <section id='clients'>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Clientes</h2>
            <Link to='/clients/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar cliente</Link>
          </div>

          <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RIF</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  allClients && allClients.length > 0 ?
                    allClients.map((client, index) =>
                      <tr key={index}>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {client.rif}</td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link to={'/clients/' + client._id}>{client.name}</Link></td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-4">
                            <Link to={'/clients/' + client._id} className="text-blue-500 hover:text-blue-700">
                              <FaEye />
                            </Link>
                            <Link to={'/clients/edit/' + client._id} className="text-green-500 hover:text-green-700">
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => { if (client._id) deleteClientHandler(client._id) }} className="text-red-500 hover:text-red-700">
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                    :
                    allClients ?
                      <tr>
                        <td colSpan={3}>Lista de clientes vacia</td>
                      </tr>
                      :
                      <tr>
                        <td colSpan={3}>Error en el servidor</td>
                      </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}