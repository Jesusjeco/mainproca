import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Client, ClientApiResponse, emptyClient } from "../../interfaces/Client"
import { createClient } from '../../apiCalls/clients';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/purchaseOrders/create')({
  component: CreateClient
})

function CreateClient() {
  const [apiResponse, setApiResponse] = useState<ClientApiResponse | null>(null);
  const [newClient, setNewClient] = useState<Client>(emptyClient);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const updateInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: value
    });

  };

  const createClientHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await createClient(newClient);
    setApiResponse(response);

    // Reset the form after submission
    if (formRef.current)
      formRef.current.reset();

    //Redirecting user to clients page
    if (response.success) {
      navigate({ to: "/clients" });
    } else {
      // Handle error
      console.error('Failed to update client');
    }
  }

  return (
    <div className='createClient'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Agregar cliente nuevo</h2>
          <form ref={formRef} onSubmit={createClientHandler}>

            <div className="mb-4">
              <label htmlFor="rif" className="block text-gray-700 text-sm font-bold mb-2">RIF*</label>
              <input required type="text" id="rif" name="rif" placeholder="Enter your rif" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
              <input required type="text" id="name" name="name" placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="legal_address" className="block text-gray-700 text-sm font-bold mb-2">Dirección fiscal*</label>
              <textarea required name="legal_address" rows={4} id="legal_address" placeholder="Enter legal_address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="office" className="block text-gray-700 text-sm font-bold mb-2">Sucursales</label>
              <textarea name="office" rows={4} id="office" placeholder="Enter office" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea name="description" rows={4} id="description" placeholder="Enter description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Crear
              </button>
            </div>
          </form>
          {apiResponse && (
            <div>
              {apiResponse.success ?
                <div>Cliente agregado a inventario</div>
                :
                <div>Error: {apiResponse.message}</div>
              }
              {/* {apiResponse.data && (
                <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}