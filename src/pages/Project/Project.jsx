import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';
import useProjects from '../../hooks/useProjects';
import useAdmin from '../../hooks/useAdmin';
import ModalFormTask from '../../components/Task/ModalFormTask';
import ModalDeleteTask from '../../components/Task/ModalDeleteTask';
import ModalDeleteCollaborator from '../../components/Collaborator/ModalDeleteCollaborator';
import Task from '../../components/Task/Task';
import Alert from '../../components/Alert';
import Collaborator from '../../components/Collaborator/Collaborator';

let socket;

const Project = () => {
   const params = useParams();
   const { getProject, setProject, project, handleModalFormTask, alerta, submitTareasProyecto } =
      useProjects();

   useEffect(() => {
      setProject({});
      getProject(params.id);
   }, []);

   useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL);
      socket.emit('abrir_proyecto', params.id);
   }, []);

   useEffect(() => {
      socket.on('response', (response) => {
         console.log(response);
      });
   });

   useEffect(() => {
      socket.on('taskAdded', (newTask) => {
         if (newTask.proyecto === project._id) {
            submitTareasProyecto(newTask);
         }
      });
   });

   const isOwnerToProject = useAdmin();

   const { nombre } = project;

   const { msg } = alerta;

   return (
      <>
         <div className='flex justify-between'>
            <h1 className='font-black text-4xl'>{nombre}</h1>
            <div className='flex justify-between gap-2 text-gray-500 hover:text-black my-auto'>
               {isOwnerToProject && (
                  <>
                     <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth={2}
                           d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                        />
                     </svg>
                     <Link to={`/projects/edit/${params.id}`} className='uppercase font-bold'>
                        Editar
                     </Link>
                  </>
               )}
            </div>
         </div>

         {isOwnerToProject && (
            <button
               type='button'
               onClick={handleModalFormTask}
               className='text-sm mt-5 px-5 py-3 w-full md:w-auto uppercase font-bold bg-sky-400 text-white text-center flex gap-2 items-center justify-center'
            >
               <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth={2}
                     d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
               </svg>
               Nueva Tarea
            </button>
         )}

         <p className='font-bold text-xl mt-10 mb-3'>Tareas del Proyecto</p>

         <div className='mt-5'>
            {project.tareas && project.tareas.length ? (
               project.tareas.map((tarea) => <Task key={tarea._id} tarea={tarea} />)
            ) : (
               <p className='text-center p-10 bg-white'>No hay tareas pendientes en el proyecto</p>
            )}
         </div>

         {isOwnerToProject && (
            <>
               <div className='flex items-center justify-between mt-2'>
                  <p className='font-bold text-xl mt-10 mb-3'>Colaboradores</p>
                  <Link
                     to={`/projects/new-collaborator/${project._id}`}
                     className='text-gray-400 uppercase font-bold hover:text-black'
                  >
                     Añadir
                  </Link>
               </div>

               <div className='mt-5 bg-white'>
                  {project.colaboradores && project.colaboradores.length ? (
                     project.colaboradores.map((colaborador) => (
                        <Collaborator key={colaborador._id} colaborador={colaborador} />
                     ))
                  ) : (
                     <p className='text-center p-10 bg-white'>
                        No hay colaboradores en el proyecto
                     </p>
                  )}
               </div>
            </>
         )}

         <ModalFormTask />
         <ModalDeleteTask />
         <ModalDeleteCollaborator />
      </>
   );
};

export default Project;
