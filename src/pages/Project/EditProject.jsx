import React, { useEffect, useState } from 'react';
import useProjects from '../../hooks/useProjects';
import { useParams } from 'react-router-dom';
import FormProject from '../../components/Project/FormProject';
import { Modal, Button } from 'react-tailwind-modal';

const EditProject = () => {
   const params = useParams();
   const { getProject, setProject, project, loading, deleteProject } =
      useProjects();

   const [show, setShow] = useState(false);

   useEffect(() => {
      setProject({});
      getProject(params.id);
   }, []);

   const { nombre } = project;

   const handleDelete = () => {
      setShow(true);
   };

   if (loading) return 'Cargando...';

   return (
      <>
         <div className='flex justify-between'>
            <h1 className='text-4xl font-black'>Editar Proyecto: {nombre}</h1>
            <div className='flex justify-between gap-2 text-gray-500 hover:text-black my-auto'>
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
                     strokeWidth='2'
                     d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  ></path>
               </svg>
               <button className='uppercase font-bold' onClick={handleDelete}>
                  Eliminar
               </button>
            </div>
         </div>

         <Modal
            title='Eliminar Proyecto'
            show={show}
            setShow={setShow}
            footer={
               <>
                  <Button title='Cancelar' onClick={() => setShow(false)} />
                  <Button
                     title='Si'
                     onClick={() => {
                        setShow(false);
                        deleteProject(params.id);
                     }}
                     type='fill'
                  />
               </>
            }
         >
            <p>Estas seguro de eliminar el proyecto?</p>
         </Modal>

         <div className='mt-10 flex justify-center'>
            <FormProject />
         </div>
      </>
   );
};

export default EditProject;
