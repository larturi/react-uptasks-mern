import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';
import useAuth from '../../hooks/useAuth';

const PreviewProject = ({ project }) => {
   const { nombre, cliente, _id, creador } = project;
   const { auth } = useAuth();
   const { setProject } = useProjects();

   useEffect(() => {
      setProject({});
   }, []);

   return (
      <div className='p-5 border-b flex justify-between' key={project.id}>
         <div className='flex items-center gap-2'>
            <p className='flex-1'>
               {nombre}
               <span className='text-sm text-gray-500 uppercase'> {cliente}</span>
            </p>

            {auth.id !== creador ? (
               <p className='px-2 py-1 text-xs rounded-lg text-white bg-green-600 uppercase'>
                  Colaborador
               </p>
            ) : (
               <p className='px-2 py-1 text-xs rounded-lg text-white bg-blue-600 uppercase'>
                  Owner
               </p>
            )}
         </div>

         <Link
            to={`${_id}`}
            className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
         >
            Ver Proyecto
         </Link>
      </div>
   );
};

export default PreviewProject;
