import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../../hooks/useProjects';
import Alert from '../Alert';

const FormProject = () => {
   const [id, setId] = useState(null);
   const [nombre, setNombre] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [fechaEntrega, setFechaEntrega] = useState('');
   const [cliente, setCliente] = useState('');

   const params = useParams();

   useEffect(() => {
      if (params.id && project.nombre) {
         setId(project._id);
         setNombre(project.nombre);
         setDescripcion(project.descripcion);
         setFechaEntrega(project.fechaEntrega?.split('T')[0]);
         setCliente(project.cliente);
      }
   }, [params]);

   const { alerta, mostrarAlerta, submitProject, project } = useProjects();

   const handleSubmit = async (e) => {
      e.preventDefault();

      if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
         mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true,
         });
         return;
      }

      await submitProject({ id, nombre, descripcion, fechaEntrega, cliente });

      if (!id) {
         setId(null);
         setNombre('');
         setDescripcion('');
         setFechaEntrega('');
         setCliente('');
      }
   };

   const { msg } = alerta;

   return (
      <form
         className='bg-white py-10 px-5 md:w-3/5 rounded shadow'
         onSubmit={handleSubmit}
      >
         {msg && <Alert alert={alerta} />}

         <div className='mb-5'>
            <label
               className='text-gray-700 uppercase font-bold text-sm'
               htmlFor='nombre'
            >
               Project Name
            </label>
            <input
               type='text'
               className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
               id='nombre'
               placeholder='Project Name'
               value={nombre}
               onChange={(e) => setNombre(e.target.value)}
            />
         </div>

         <div className='mb-5'>
            <label
               className='text-gray-700 uppercase font-bold text-sm'
               htmlFor='descripcion'
            >
               Description
            </label>
            <textarea
               className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
               id='descripcion'
               placeholder='Project description'
               value={descripcion}
               onChange={(e) => setDescripcion(e.target.value)}
            />
         </div>

         <div className='mb-5'>
            <label
               className='text-gray-700 uppercase font-bold text-sm'
               htmlFor='fecha-entrega'
            >
               Due Date
            </label>
            <input
               type='date'
               className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
               id='fechaEntrega'
               value={fechaEntrega}
               onChange={(e) => setFechaEntrega(e.target.value)}
            />
         </div>

         <div className='mb-5'>
            <label
               className='text-gray-700 uppercase font-bold text-sm'
               htmlFor='cliente'
            >
               Client Name
            </label>
            <input
               type='text'
               className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
               id='cliente'
               placeholder='Client Name'
               value={cliente}
               onChange={(e) => setCliente(e.target.value)}
            />
         </div>

         <input
            type='submit'
            value={id ? 'Editar Proyecto' : 'Crear Proyecto'}
            className='bg-sky-600 w-full p-3 uppercase text-white font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors'
         />
      </form>
   );
};

export default FormProject;
