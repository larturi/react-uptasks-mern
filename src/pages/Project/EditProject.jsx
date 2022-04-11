import React, { useEffect } from 'react';
import useProjects from '../../hooks/useProjects';
import { useParams } from 'react-router-dom';
import FormProject from '../../components/Project/FormProject';

const EditProject = () => {
   const params = useParams();
   const { getProject, setProject, project, loading } = useProjects();

   useEffect(() => {
      setProject({});
      getProject(params.id);
   }, []);

   const { nombre } = project;

   if (loading) return 'Cargando...';

   return (
      <>
         <h1 className='text-4xl font-black'>Editar Proyecto: {nombre}</h1>

         <div className='mt-10 flex justify-center'>
            <FormProject />
         </div>
      </>
   );
};

export default EditProject;
