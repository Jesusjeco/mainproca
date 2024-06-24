import { createFileRoute, ErrorComponent, ErrorComponentProps, useNavigate } from '@tanstack/react-router'
import { editClientById, fetchClientById } from '../../apiCalls/clients'
import { Client } from "../../interfaces/Client"
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/clients/edit/$clientId')({
  loader: async ({ params: { clientId } }) => fetchClientById(clientId),
  errorComponent: PostErrorComponent as any,
  notFoundComponent: () => {
    return <p>Cliente no encontrado</p>
  },
  component: EditClient
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

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
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
              <input required type="text" id="name" name="name" placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newClient.name}
                onChange={handleInputChange}
              />
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