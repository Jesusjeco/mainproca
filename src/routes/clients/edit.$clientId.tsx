import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { editClientById, fetchClientById } from '../../apiCalls/clients'
import { Client } from "../../interfaces/Client"
import { useEffect, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent'
import { NotFoundComponent } from '../../components/NotFoundComponent'

export const Route = createFileRoute('/clients/edit/$clientId')({
  loader: async ({ params: { clientId } }) => fetchClientById(clientId),
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Cliente no encontrado" />,
  component: EditClient
})

function EditClient() {
  const client = Route.useLoaderData<Client>()
  const [newClient, setNewClient] = useState<Client>(client)
  const navigate = useNavigate();

  const modifyClientHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await editClientById(newClient);
    if (response.success) {
      navigate({ to: "/clients/" + newClient._id });
    } else {
      // Handle error
      console.error('Failed to update client');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: value
    });
  };

  useEffect(() => {
    setNewClient(client);
  }, [client]);

  return (
    <div className='createClient'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Modificar cliento</h2>
          <form onSubmit={modifyClientHandler}>

            <div className="mb-4">
              <label htmlFor="rif" className="block text-gray-700 text-sm font-bold mb-2">RIF*</label>
              <input required type="text" id="rif" name="rif" placeholder="Enter your rif" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newClient.rif}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
              <input required type="text" id="name" name="name" placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newClient.name}
                onChange={handleInputChange}
              />
            </div>


            <div className="mb-4">
              <label htmlFor="legal_address" className="block text-gray-700 text-sm font-bold mb-2">Dirección fiscal</label>
              <textarea name="legal_address" rows={4} id="legal_address" placeholder="Enter legal_address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newClient.legal_address}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="office" className="block text-gray-700 text-sm font-bold mb-2">Sucursal</label>
              <textarea name="office" rows={4} id="office" placeholder="Enter office" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newClient.office}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea name="description" rows={4} id="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleInputChange}
                value={newClient.description}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cambiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}