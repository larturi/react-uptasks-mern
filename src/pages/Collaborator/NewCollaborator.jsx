import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CollaboratorForm from './CollaboratorForm';
import useProjects from '../../hooks/useProjects';
import Alert from '../../components/Alert';

const NewCollaborator = () => {
   const {
      getProject,
      project,
      collaborator,
      loading,
      addCollaborator,
      alerta,
   } = useProjects();
   const params = useParams();

   useEffect(() => {
      getProject(params.id);
   }, []);

   if (!project?._id) return <Alert alert={alerta} />;

   return (
      <>
         <h3 className='text-4xl font-black'>Añadir Colaborador</h3>
         <h5 className='text mt-2 text-gray-500 uppercase'>
            Proyecto {project.nombre}
         </h5>

         <div className='mt-10 flex justify-center'>
            <CollaboratorForm />
         </div>

         {loading ? (
            <div className='mt-5 flex justify-center'>
               <div className='bg-white py-10 px-5 rounded-lg shadow w-full md:w-3/5'>
                  <p>Cargando...</p>
               </div>
            </div>
         ) : (
            collaborator._id && (
               <div className='mt-5 flex justify-center'>
                  <div className='bg-white py-10 px-5 rounded-lg shadow w-full md:w-3/5'>
                     <div className='flex justify-between items-center'>
                        <p>{collaborator.nombre}</p>
                        <button
                           type='button'
                           className='bg-slate-500 px-5 py-2 rounded uppercase text-white font-bold text-sm'
                           onClick={() => addCollaborator(collaborator.email)}
                        >
                           Agregar
                        </button>
                     </div>
                  </div>
               </div>
            )
         )}
      </>
   );
};

export default NewCollaborator;
