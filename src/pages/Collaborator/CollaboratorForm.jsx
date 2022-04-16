import React, { useState } from 'react';
import Alert from '../../components/Alert';
import useProjects from '../../hooks/useProjects';

const CollaboratorForm = () => {
   const [email, setEmail] = useState('');

   const { mostrarAlerta, alerta, submitCollaborator } = useProjects();

   const handleSubmit = (e) => {
      e.preventDefault();

      if (email === '') {
         mostrarAlerta({
            msg: 'El email es obligatorio',
            error: true,
         });
         return;
      }

      submitCollaborator(email);
   };

   const { msg } = alerta;

   return (
      <form
         className='bg-white py-10 px-5 rounded shadow w-full md:w-3/5'
         onSubmit={handleSubmit}
      >
         {msg && <Alert alert={alerta} />}
         <div className='mb-5'>
            <label
               htmlFor='email'
               className='uppercase font-bold text-sm text-gray-700'
            >
               Email del Colaborador
            </label>
            <input
               type='email'
               id='email'
               placeholder='Email del Colaborador'
               className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>

         <input
            type='submit'
            className='bg-sky-600 hover:bg-sky-700 w-full uppercase text-white font-bold py-2 px-4 rounded-md mb-0 cursor-pointer transition-colors'
            value='Buscar Colaborador'
         />
      </form>
   );
};

export default CollaboratorForm;
