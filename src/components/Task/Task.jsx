import React from 'react';
import { formatearFecha } from '../../helpers/fechas';
import useProjects from '../../hooks/useProjects';
import useAdmin from '../../hooks/useAdmin';

const Task = ({ tarea }) => {
   const { nombre, descripcion, prioridad, fechaEntrega, estado, _id, completedBy } = tarea;

   const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProjects();

   const isOwnerToProject = useAdmin();

   return (
      <div className='border-b p-4 flex justify-between items-center bg-white shadow mt-4 rounded'>
         <div>
            <p className='mb-1 uppercase'>{nombre}</p>
            <p className='mb-1 text-sm text-gray-500'>{descripcion}</p>
            <p className='mb-1 text-sm text-gray-600'>
               Vencimiento: {formatearFecha(fechaEntrega)}
            </p>
            <p className='mb-1 text-sm text-gray-600'>Prioridad: {prioridad}</p>
            {estado && completedBy && (
               <p className='text-xs bg-green-700 uppercase rounded-lg text-white px-2 py-1'>
                  Completada por: {completedBy.email}
               </p>
            )}
         </div>

         <div className='flex gap-2'>
            {isOwnerToProject && (
               <button
                  className='bg-indigo-500 uppercase hover:bg-indigo-600 text-white text-sm font-bold py-2 px-4'
                  onClick={() => handleModalEditarTarea(tarea)}
               >
                  Editar
               </button>
            )}

            <button
               className={`${
                  estado ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-700'
               }  uppercase  text-sm font-bold text-white py-2 px-4`}
               onClick={() => completarTarea(_id)}
            >
               {estado ? 'Completa' : 'Pendiente'}
            </button>

            {isOwnerToProject && (
               <button
                  className='bg-red-500 uppercase hover:bg-red-600 text-sm font-bold text-white py-2 px-4'
                  onClick={() => handleModalEliminarTarea(tarea)}
               >
                  Eliminar
               </button>
            )}
         </div>
      </div>
   );
};

export default Task;
