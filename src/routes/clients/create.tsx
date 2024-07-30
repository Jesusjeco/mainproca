import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Client, ClientOffice, emptyClient } from "../../interfaces/Client"
import { useEffect, useRef, useState } from 'react';
import { AvoidEnterKeyPress } from '../../utils/AvoidEnterKeyPress';
import { useClientsStore } from '../../store/clientStore';
import { ClientSelectOffices } from '../../components/clients/ClientSelectOffices';

export const Route = createFileRoute('/clients/create')({ 
  component: CreateClient
})

function CreateClient() {
  const [newClient, setNewClient] = useState<Client>(emptyClient);

  const createClient = useClientsStore(state => state.createClient)
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const updateInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClient(
      {
      ...newClient,
      [name]: value
    });
  };

  //Variables to handle offices
  const [offices, setOffices] = useState<ClientOffice[]>([]);
  const setOfficesResult = (offices: ClientOffice[]) => {
    setOffices(offices);
  }
  useEffect(() => {
    setNewClient(
      {
        ...newClient,
        offices: offices
      }
    );
  }, [offices]);

  //Create client function
  const createClientHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await createClient(newClient);
    //Redirecting user to clients page
    if (response.success) {
      // Reset the form after submission
      if (formRef.current)
        formRef.current.reset();
      navigate({ to: "/clients" });
    } else {
      // Handle error
      console.error('Failed to update client');
    }
  }

  return (
    <div className='createClient'>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-4/5">
          <h2 className="text-2xl font-bold mb-6 text-center">Agregar cliente nuevo</h2>
          <form ref={formRef} onSubmit={createClientHandler} onKeyDown={AvoidEnterKeyPress}>

            <div className="mb-4 grid gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="rif" className="block text-gray-700 text-sm font-bold mb-2">RIF*</label>
                <input required type="text" id="rif" name="rif" placeholder="Enter your rif" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={updateInputHandler}
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre*</label>
                <input required type="text" id="name" name="name" placeholder="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={updateInputHandler}
                />
              </div>

              <div>
                <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">Número</label>
                <input type="text" id="number" name="number" placeholder="Enter client number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={updateInputHandler}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={updateInputHandler}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="legal_address" className="block text-gray-700 text-sm font-bold mb-2">Dirección fiscal*</label>
              <textarea required name="legal_address" rows={4} id="legal_address" placeholder="Enter legal_address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={updateInputHandler}
              ></textarea> 
            </div>

            <div className="mb-4">
              <ClientSelectOffices label="office" setOfficesResult={setOfficesResult} />
            </div>

            <div className="mb-4">
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

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}