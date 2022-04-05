import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
   const { token } = useParams();

   const [alerta, setAlerta] = useState({});
   const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

   useEffect(() => {
      const confirmarCuenta = async () => {
         try {
            const res = await clienteAxios.get(`/users/confirm/${token}`);
            setAlerta({
               error: false,
               msg: res.data.msg,
            });

            setCuentaConfirmada(true);
         } catch (error) {
            setAlerta({
               error: true,
               msg: error.response.data.msg,
            });
            console.error(error);
         }
      };

      confirmarCuenta();
   }, []);

   const { msg } = alerta;

   return (
      <>
         <h1 className='text-sky-600 font-black text-4xl mb-6 uppercase text-center'>
            Confirma tu cuenta y comienza a crear tus{' '}
            <span className='text-slate-700'>proyectos</span>
         </h1>

         <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded bg-white'>
            {msg && <Alert alert={alerta} />}

            {cuentaConfirmada && (
               <Link
                  to='/'
                  className='block text-center my-3 text-slate uppercase text-sm'
               >
                  Iniciar Sesión
               </Link>
            )}
         </div>
      </>
   );
};

export default ConfirmAccount;
