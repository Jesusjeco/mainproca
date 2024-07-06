import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { editClientById, fetchClientById } from '../../apiCalls/clients'
import { Client, ClientOffice, emptyClientOffice } from "../../interfaces/Client"
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

  // Managing offices
  const [officesArray, setOfficesArray] = useState<ClientOffice[]>([]);
  useEffect(() => {
    if (newClient.offices)
      setOfficesArray(newClient.offices);
  }, [newClient]);

  const addOffice = () => {
    const auxOfficesArray = [...officesArray, emptyClientOffice]
    setOfficesArray(auxOfficesArray);
  }

  const removeOffice = (index: number) => {
    const auxOfficesArray = officesArray.filter((_, i) => i !== index);
    setOfficesArray(auxOfficesArray);
  }

  const setOfficesArrayHandler = (office: ClientOffice, index: number) => {
    const auxOfficesArray = [...officesArray];
    auxOfficesArray[index] = office;
    setOfficesArray(auxOfficesArray);
  }

  // Updating client with offices
  useEffect(() => {
    setNewClient({
      ...newClient,
      offices: officesArray
    });
  }, [officesArray]);

  // Sending client to update
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
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full w-4/5 bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Modificar cliente</h2>
        <form onSubmit={modifyClientHandler} className='space-y-4'>
          <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 items-center'>
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
              //onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor='name' className='block text-gray-700 font-bold'>Nombre*</label>
              <input
                required
                disabled
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                className='w-full mt-2 p-2 border rounded'
                value={newClient.name}
              //onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 items-center'>
            <div>
              <label htmlFor='number' className='block text-gray-700 font-bold'>Número</label>
              <input
                required
                type='text'
                id='number'
                name='number'
                placeholder='Enter your number'
                className='w-full mt-2 p-2 border rounded'
                value={newClient.number}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-gray-700 font-bold'>Email</label>
              <input
                required
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                className='w-full mt-2 p-2 border rounded'
                value={newClient.email}
                onChange={handleInputChange}
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
              onChange={handleInputChange}
              value={newClient.legal_address}
            ></textarea>
          </div>

          <div>
            <div className='flex items-center justify-between mb-3'>
              <label htmlFor='office' className='block text-gray-700 font-bold'>Sucursales</label>
              <button type='button' className='bg-blue-500 text-white px-4 py-2 rounded' onClick={addOffice}>Agregar sucursal</button>
            </div>

            {officesArray.length > 0 ? (
              officesArray.map((office, index) => (
                <div key={index} className='flex items-center mb-2'>
                  <input
                    type='text'
                    name='office'
                    id='office'
                    placeholder='Enter office'
                    className='w-full p-2 border rounded mr-2'
                    value={office.address}
                    onChange={(e) => setOfficesArrayHandler({ address: e.target.value }, index)}
                  />
                  <button type='button' className='bg-red-500 text-white px-2 py-1 rounded' onClick={() => removeOffice(index)}>−</button>
                </div>
              ))
            ) : (
              <div>Sin sucursales registradas</div>
            )}
          </div>

          <div>
            <label htmlFor='description' className='block text-gray-700 font-bold'>Descripción</label>
            <textarea
              name='description'
              rows={4}
              id='description'
              placeholder='Enter description'
              className='w-full mt-2 p-2 border rounded'
              onChange={handleInputChange}
              value={newClient.description}
            ></textarea>
          </div>

          <div className='flex items-center justify-between'>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Cambiar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}