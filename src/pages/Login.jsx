import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-3xl uppercase text-center'>
        Inicia sesión y administra tus <span className='text-slate-700'>proyectos</span>
      </h1>

      <form className='my-10 bg-white shadow rounded-lg p-10'>
        <div className='my-5'>
          <label 
            className='uppercase text-gray-600 block font-bold'
            htmlFor='email'
          >Email</label>
          <input 
            type="email"
            id='email'
            placeholder='Email'
            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
          />
        </div>

        <div className='my-5'>
          <label 
            className='uppercase text-gray-600 block font-bold'
            htmlFor='email'
          >Password</label>
          <input 
            type="password"
            id='password'
            placeholder='Password'
            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
          />
        </div>

        <input 
          type="submit" 
          value="Iniciar Sesión"
          className='w-full mb-5 mt-5 p-3 bg-sky-600 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-color duration-300 ease-in-out'
        />

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link 
          to="/register"
          className='block text-center my-5 text-slate uppercase text-sm'
        >¿No tienes una cuenta? Registrar</Link>
        <Link 
          to="/forget-password"
          className='block text-center my-5 text-slate uppercase text-sm'
        >Olvidé mi password</Link>
      </nav>
    </>
  )
}

export default Login;