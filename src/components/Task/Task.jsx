import React from 'react';
import { formatearFecha } from '../../helpers/fechas';
import useProjects from '../../hooks/useProjects';

const Task = ({ tarea }) => {
   const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea;

   const { handleModalEditarTarea, handleModalEliminarTarea } = useProjects();

   return (
      <div className='border-b p-4 flex justify-between items-center bg-white shadow mt-4 rounded'>
         <div>
            <p className='mb-1 uppercase'>{nombre}</p>
            <p className='mb-1 text-sm text-gray-500'>{descripcion}</p>
            <p className='mb-1 text-sm text-gray-600'>
               Vencimiento: {formatearFecha(fechaEntrega)}
            </p>
            <p className='mb-1 text-sm text-gray-600'>Prioridad: {prioridad}</p>
         </div>

         <div className='flex gap-2'>
            <button
               className='bg-indigo-500 uppercase hover:bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded'
               onClick={() => handleModalEditarTarea(tarea)}
            >
               Editar
            </button>

            {estado ? (
               <button className='bg-gray-500 uppercase hover:bg-indigo-700 text-sm font-bold text-white py-2 px-4 rounded'>
                  Incompleta
               </button>
            ) : (
               <button className='bg-sky-500 uppercase hover:bg-sky-600 text-sm font-bold text-white py-2 px-4 rounded'>
                  Completa
               </button>
            )}

            <button
               className='bg-red-500 uppercase hover:bg-red-600 text-sm font-bold text-white py-2 px-4 rounded'
               onClick={() => handleModalEliminarTarea(tarea)}
            >
               Eliminar
            </button>
         </div>
      </div>
   );
};

export default Task;
