import React, { useState, useEffect } from 'react';
import useProjects from '../../hooks/useProjects';
import Alert from '../Alert';

const FormTask = ({ projectId }) => {
   const [id, setId] = useState('');
   const [nombre, setNombre] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [fechaEntrega, setFechaEntrega] = useState('');
   const [prioridad, setPrioridad] = useState('');

   const PRIORIDAD_ENUM = ['Alta', 'Media', 'Baja'];

   const { mostrarAlerta, alerta, submitTask, tarea } = useProjects();

   useEffect(() => {
      if (tarea._id) {
         setId(tarea._id);
         setNombre(tarea.nombre);
         setDescripcion(tarea.descripcion);
         setFechaEntrega(tarea.fechaEntrega?.split('T')[0]);
         setPrioridad(tarea.prioridad);
         return;
      }
      setId('');
      setNombre('');
      setDescripcion('');
      setFechaEntrega('');
      setPrioridad('');
   }, [tarea]);

   const handleSubmit = (e) => {
      e.preventDefault();

      if ([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
         mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true,
         });
         return;
      }

      submitTask({
         id,
         nombre,
         descripcion,
         fechaEntrega,
         prioridad,
         proyecto: projectId,
      });
   };

   const { msg } = alerta;

   return (
      <>
         <form onSubmit={handleSubmit} className='my-10'>
            <div className='mb-5'>
               <label
                  htmlFor='nombre'
                  className='uppercase font-bold text-sm text-gray-700'
               >
                  Nombre
               </label>
               <input
                  type='text'
                  id='nombre'
                  placeholder='Nombre de la tarea'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
               />
            </div>

            <div className='mb-5'>
               <label
                  htmlFor='descripcion'
                  className='uppercase font-bold text-sm text-gray-700'
               >
                  Descripción
               </label>
               <textarea
                  id='descripcion'
                  placeholder='Descripción de la tarea'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
               />
            </div>

            <div className='mb-5'>
               <label
                  htmlFor='fechaEntrega'
                  className='uppercase font-bold text-sm text-gray-700'
               >
                  Fecha de Entrega
               </label>
               <input
                  type='date'
                  id='fechaEntrega'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={fechaEntrega}
                  onChange={(e) => setFechaEntrega(e.target.value)}
               />
            </div>

            <div className='mb-5'>
               <label
                  htmlFor='prioridad'
                  className='uppercase font-bold text-sm text-gray-700'
               >
                  Prioridad
               </label>
               <select
                  id='prioridad'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
               >
                  <option value=''>-- Seleccione una prioridad --</option>
                  {PRIORIDAD_ENUM.map((prioridad) => (
                     <option key={prioridad}>{prioridad}</option>
                  ))}
               </select>

               <input
                  type='submit'
                  className='bg-sky-600 hover:bg-sky-700 w-full uppercase text-white font-bold py-2 px-4 rounded-md mt-10 mb-0 cursor-pointer transition-colors'
                  value={tarea._id ? 'Guardar Cambios' : 'Crear Tarea'}
               />
            </div>
         </form>

         <div className='mt-5'>{msg && <Alert alert={alerta} />}</div>
      </>
   );
};

export default FormTask;
