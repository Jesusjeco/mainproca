import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Client, ClientOffice } from "../../interfaces/Client"
import { useEffect, useState } from 'react'
import { FetchErrorComponent } from '../../components/FetchErrorComponent'
import { NotFoundComponent } from '../../components/NotFoundComponent'
import { useClientsStore } from '../../store/clientStore'
import { LoadingComponent } from '../../components/LoadingComponent'
import { ClientSelectOffices } from '../../components/clients/ClientSelectOffices'

interface EditClientProps {
  clientId: string
}
export const Route = createFileRoute('/clients/edit/$clientId')({
  loader: async ({ params }: { params: EditClientProps }) => params.clientId,
  errorComponent: FetchErrorComponent as any,
  notFoundComponent: () => <NotFoundComponent message="Cliente no encontrado" />,
  component: EditClient
})

function EditClient() {
  const clientId = Route.useLoaderData() as string;
  const editClientById = useClientsStore(state => state.editClientById)
  const loading = useClientsStore(state => state.loading)
  const getClientById = useClientsStore(state => state.getClientById)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getClientById(clientId)
      setNewClient(response)
      if (response) {
        setOffices(response.offices)
      }
    }//fetchData
    fetchData()
  }, [clientId, getClientById])

  const [newClient, setNewClient] = useState<Client | undefined>(undefined)
  const navigate = useNavigate();

  const [offices, setOffices] = useState<ClientOffice[]>([]);
  const setOfficesResult = (offices: ClientOffice[]) => {
    setOffices(offices);
  }
  useEffect(() => {
    if (newClient)
      setNewClient(
        {
          ...newClient,
          offices: offices
        }
      );
  }, [offices]);

  //Updating all values
  const updateInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (newClient)
      setNewClient(
        {
          ...newClient,
          [name]: value
        }
      )
  }
  // Updating client with offices

  // Sending client to update
  const modifyClientHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newClient) {
      const response = await editClientById(newClient);
      if (response.success)
        navigate({ to: "/clients/" + newClient._id });
    } else {
      // Handle error
      console.error('Failed to update client');
    }
  }//modifyClientHandler

  return (
    <>
      {loading && !newClient ? (
        <LoadingComponent var1={loading} />
      ) : (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
          <div className='w-full w-4/5 bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Modificar cliente</h2>
            {newClient ?
              <form onSubmit={modifyClientHandler} className='space-y-4'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 items-center'>
                  <div>
                    <label htmlFor='rif' className='block text-gray-700 font-bold'>RIF*</label>
                    <input
                      required
                      disabled
                      type='text'
                      id='rif'
                      name='rif'
                      placeholder='Enter your rif'
                      className='w-full mt-2 p-2 border rounded'
                      value={newClient.rif}
                    //onChange={updateInputHandler}
                    />
                  </div>

                  <div>
                    <label htmlFor='name' className='block text-gray-700 font-bold'>Nombre*</label>
                    <input
                      required
                      type='text'
                      id='name'
                      name='name'
                      placeholder='Enter your name'
                      className='w-full mt-2 p-2 border rounded'
                      value={newClient.name}
                      onChange={updateInputHandler}
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 items-center'>
                  <div>
                    <label htmlFor='number' className='block text-gray-700 font-bold'>Número</label>
                    <input
                      type='text'
                      id='number'
                      name='number'
                      placeholder='Enter your number'
                      className='w-full mt-2 p-2 border rounded'
                      value={newClient.number}
                      onChange={updateInputHandler}
                    />
                  </div>

                  <div>
                    <label htmlFor='email' className='block text-gray-700 font-bold'>Email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Enter your email'
                      className='w-full mt-2 p-2 border rounded'
                      value={newClient.email}
                      onChange={updateInputHandler}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='legal_address' className='block text-gray-700 font-bold'>Dirección fiscal</label>
                  <textarea
                    name='legal_address'
                    rows={2}
                    id='legal_address'
                    placeholder='Enter legal address'
                    className='w-full mt-2 p-2 border rounded'
                    onChange={updateInputHandler}
                    value={newClient.legal_address}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <ClientSelectOffices label="office" setOfficesResult={setOfficesResult} selectedOffices={offices} />
                </div>

                <div>
                  <label htmlFor='description' className='block text-gray-700 font-bold'>Descripción</label>
                  <textarea
                    name='description'
                    rows={4}
                    id='description'
                    placeholder='Enter description'
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    onChange={updateInputHandler}
                    value={newClient.description}
                  ></textarea>
                </div>

                <div className='flex items-center justify-between'>
                  <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Cambiar
                  </button>
                </div>
              </form>
              : "Cliente es undefined"}
          </div>
        </div>
      )}
    </>
  )
}