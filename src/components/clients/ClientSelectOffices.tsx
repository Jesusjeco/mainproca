import { useEffect, useState } from "react";
import { ClientOffice, emptyClientOffice } from "../../interfaces/Client";

interface ClientSelectOfficesProps {
  label: string,
  setOfficesResult: (setOfficesResult: ClientOffice[]) => void,
  selectedOffices?: ClientOffice[]
}
export const ClientSelectOffices = ({ label = "office", setOfficesResult, selectedOffices=[] }: ClientSelectOfficesProps) => {
  const [offices, setOffices] = useState<ClientOffice[]>(selectedOffices);
  const addOffice = () => {
    const auxOffices = [...offices, emptyClientOffice];
    setOffices(auxOffices);
  }
  const removeOffice = (index: number) => {
    const auxOffices = offices.filter((_, i) => i !== index);
    setOffices(auxOffices);
  }
  const setOfficesHandler = (office: ClientOffice, index: number) => {
    const auxOffices = [...offices]
    auxOffices[index] = office;
    setOffices(auxOffices);
  }
  useEffect(() => {
    setOfficesResult(offices)
  }, [offices])

  return <>
    <div className='flex items-center justify-between mb-3'>
      <label htmlFor={label} className="block text-gray-700 font-bold mb-2">Sucursales</label>
      <button type="button" onClick={addOffice} className="bg-blue-500 text-white px-4 py-2 rounded-md">Agregar sucursal</button>
    </div>

    {offices.length > 0 ?
      offices.map((office, index) =>
        <div key={index} className="flex items-center mb-2">
          <input key={index} type='text' name={label} id={label} placeholder="Enter office" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={office.address}
            onChange={(e) => setOfficesHandler({ address: e.target.value }, index)}
          />
          <button type='button' className='bg-red-500 text-white px-2 py-1 rounded' onClick={() => removeOffice(index)}>−</button>
        </div>
      ) : "Sin sucursales registradas"}
  </>
}