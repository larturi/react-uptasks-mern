import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';

const Project = () => {
   const params = useParams();
   const { getProject, setProject, project } = useProjects();

   useEffect(() => {
      setProject({});
      getProject(params.id);
   }, []);

   const { nombre } = project;

   return (
      <div>
         <h1 className='font-black text-4xl'>{nombre}</h1>
      </div>
   );
};

export default Project;
