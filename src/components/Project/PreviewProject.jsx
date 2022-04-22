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
      <div className='p-5 border-b flex flex-col md:flex-row justify-between' key={project.id}>
         <div className='flex items-center gap-2'>
            <div className='flex-1'>
               <p>{nombre}</p>
               <p className='text-ultra-sm text-gray-500 uppercase w-full'> {cliente}</p>
            </div>

            {auth.id !== creador ? (
               <p className='px-2 py-1 text-ultra-sm rounded text-white bg-green-600 uppercase'>
                  Colaborador
               </p>
            ) : (
               <p className='px-2 py-1 text-ultra-sm rounded text-white bg-blue-600 uppercase'>
                  Owner
               </p>
            )}
         </div>

         <Link
            to={`${_id}`}
            className='px-4 py-3 text-xs rounded text-white bg-purple-600 hover:bg-purple-700 text-center mt-4 md:mt-0 uppercase'
         >
            Ver Proyecto
         </Link>
      </div>
   );
};

export default PreviewProject;
