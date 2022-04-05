import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alert from '../components/Alert';

const ChangePassword = () => {
   const params = useParams();
   const token = params.token;

   const [tokenValido, setTokenValido] = useState(false);
   const [alerta, setAlerta] = useState({});
   const [password, setPassword] = useState('');
   const [passwordModificado, setPasswordModificado] = useState(false);

   useEffect(() => {
      const comprobarToken = async () => {
         try {
            const data = await clienteAxios.get(
               `/users/recovery-password/${token}`
            );
            setTokenValido(true);
         } catch (error) {
            setAlerta({
               error: true,
               msg: 'El token no es válido',
            });
         }
      };
      comprobarToken();
   }, []);

   const { msg } = alerta;

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (password.length < 6) {
         setAlerta({
            error: true,
            msg: 'Password inválido',
         });
         return;
      }

      try {
         const url = `/users/recovery-password/${token}`;

         const { data } = await clienteAxios.post(url, { password });

         setPasswordModificado(true);

         setAlerta({
            error: false,
            msg: 'Password cambiado con éxito',
         });
      } catch (error) {
         setAlerta({
            error: true,
            msg: 'Error al cambiar el password',
         });
      }
   };

   return (
      <>
         {tokenValido ? (
            <>
               <h1 className='text-sky-600 font-black text-3xl mb-6 uppercase text-center'>
                  Reestablece tu password
               </h1>

               {msg && <Alert alert={alerta} />}

               <form
                  className='my-2 bg-white shadow rounded-lg p-10'
                  onSubmit={handleSubmit}
               >
                  <div className='my-3'>
                     <label
                        className='uppercase text-gray-600 block font-bold'
                        htmlFor='password'
                     >
                        Nuevo Password
                     </label>
                     <input
                        type='password'
                        id='password'
                        placeholder='Escribe tu Nuevo Password'
                        className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>

                  <input
                     type='submit'
                     value='Confirmar Password'
                     className='w-full mb-2 mt-2 p-3 bg-sky-600 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-color duration-300 ease-in-out'
                  />
               </form>

               {passwordModificado && (
                  <Link
                     to='/'
                     className='block text-center my-3 text-slate uppercase text-sm'
                  >
                     Iniciar Sesión
                  </Link>
               )}
            </>
         ) : (
            <>
               <h1 className='text-sky-600 font-black text-3xl mb-6 uppercase text-center'>
                  No es posible recuperar tu password
               </h1>

               <Alert alert={alerta} />
            </>
         )}
      </>
   );
};

export default ChangePassword;
