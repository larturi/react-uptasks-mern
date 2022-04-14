import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';

const PreviewProject = ({ project }) => {
   const { nombre, cliente, _id } = project;
   const { setProject } = useProjects();

   useEffect(() => {
      setProject({});
   }, []);

   return (
      <div className='p-5 border-b flex' key={project.id}>
         <p className='flex-1'>
            {nombre}
            <span className='text-sm text-gray-500 uppercase'> {cliente}</span>
         </p>
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