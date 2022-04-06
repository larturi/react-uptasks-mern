import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [alerta, setAlerta] = useState({});

   const { setAuth } = useAuth();

   const handleSubmit = async (e) => {
      e.preventDefault();

      if ([email, password].includes('')) {
         setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true,
         });
         return;
      }

      try {
         const { data } = await clienteAxios.post('/users/login', {
            email,
            password,
         });
         localStorage.setItem('token', data.token);
         setAuth(data);
         setAlerta({});
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         });
      }
   };

   const { msg } = alerta;

   return (
      <>
         <h1 className='text-sky-600 font-black text-3xl uppercase text-center'>
            Inicia sesión y administra tus{' '}
            <span className='text-slate-700'>proyectos</span>
         </h1>

         {msg && <Alert alert={alerta} />}

         <form
            className='my-10 bg-white shadow rounded-lg p-10'
            onSubmit={handleSubmit}
         >
            <div className='my-5'>
               <label
                  className='uppercase text-gray-600 block font-bold'
                  htmlFor='email'
               >
                  Email
               </label>
               <input
                  type='email'
                  id='email'
                  placeholder='Email'
                  className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>

            <div className='my-5'>
               <label
                  className='uppercase text-gray-600 block font-bold'
                  htmlFor='email'
               >
                  Password
               </label>
               <input
                  type='password'
                  id='password'
                  placeholder='Password'
                  className='w-full mt-3 p-3 border rounded-md bg-gray-50'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <input
               type='submit'
               value='Iniciar Sesión'
               className='w-full mb-5 mt-5 p-3 bg-sky-600 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-color duration-300 ease-in-out'
            />
         </form>

         <nav className='lg:flex lg:justify-between'>
            <Link
               to='/register'
               className='block text-center my-5 text-slate uppercase text-sm'
            >
               ¿No tienes una cuenta? Registrar
            </Link>
            <Link
               to='/forget-password'
               className='block text-center my-5 text-slate uppercase text-sm'
            >
               Olvidé mi password
            </Link>
         </nav>
      </>
   );
};

export default Login;
