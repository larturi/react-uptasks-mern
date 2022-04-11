import React from 'react';
import PreviewProject from '../../components/Project/PreviewProject';
import useProjects from '../../hooks/useProjects';

const Projects = () => {
   const { projects } = useProjects();
   return (
      <>
         <h1 className='text-4xl font-black'>Projects</h1>

         <div className='bg-white shadow mt-10 rounded'>
            {projects.length ? (
               projects.map((project) => (
                  <PreviewProject project={project} key={project._id} />
               ))
            ) : (
               <p className='text-center text-gray-500 uppercase p-5'>
                  No hay proyectos aun
               </p>
            )}
         </div>
      </>
   );
};

export default Projects;
