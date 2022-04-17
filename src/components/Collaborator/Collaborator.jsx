import React from 'react';
import useProjects from '../../hooks/useProjects';

const Collaborator = ({ colaborador }) => {
   const { nombre, email, _id } = colaborador;
   const { handleModalDeleteCollaborator } = useProjects();
   return (
      <div className='border-b p-5 flex justify-between items-center'>
         <div>
            <p>{nombre}</p>
            <p className='text-gray-600 text-sm'>{email}</p>
         </div>
         <div>
            <button
               type='button'
               className='bg-red-500 uppercase hover:bg-red-600 text-sm font-bold text-white py-2 px-4'
               onClick={() => {
                  handleModalDeleteCollaborator(colaborador);
               }}
            >
               Eliminar
            </button>
         </div>
      </div>
   );
};

export default Collaborator;
