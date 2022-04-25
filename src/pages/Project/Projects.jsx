import React, { useEffect } from 'react';
import io from 'socket.io-client';
import PreviewProject from '../../components/Project/PreviewProject';
import useProjects from '../../hooks/useProjects';

let socket;

const Projects = () => {
   const { projects } = useProjects();

   useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL);
      // socket.emit('join', { room: 'Projects' });
      // return () => {
      //    socket.emit('disconnect');
      //    socket.off();
      // };
   }, []);

   return (
      <>
         <h1 className='text-4xl font-black'>Projects</h1>

         <div className='bg-white shadow mt-10 rounded'>
            {projects.length ? (
               projects.map((project) => <PreviewProject project={project} key={project._id} />)
            ) : (
               <p className='text-center text-gray-500 uppercase p-5'>No hay proyectos aun</p>
            )}
         </div>
      </>
   );
};

export default Projects;
