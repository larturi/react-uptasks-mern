import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-2xl mb-6 uppercase text-center'>
       Crea tu cuenta y administra tus <span className='text-slate-700'>proyectos</span>
      </h1>

      <form className='my-2 bg-white shadow rounded-lg p-10'>
        <div className='my-2'>
          <label 
            className='uppercase text-gray-600 block font-bold'
            htmlFor='nombre'
          >Nombre</label>
          <input 
            type="text"
            id='nombre'
            placeholder='Nombre'
            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
          />
        </div>

        <div className='my-3'>
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

        <div className='my-3'>
          <label 
            className='uppercase text-gray-600 block font-bold'
            htmlFor='password'
          >Password</label>
          <input 
            type="password"
            id='password'
            placeholder='Password'
            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
          />
        </div>

        <div className='my-3'>
          <label 
            className='uppercase text-gray-600 block font-bold'
            htmlFor='password2'
          >Repetir Password</label>
          <input 
            type="password"
            id='password2'
            placeholder='password2'
            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
          />
        </div>

        <input 
          type="submit" 
          value="Crear Cuenta"
          className='w-full mb-2 mt-2 p-3 bg-sky-600 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-color duration-300 ease-in-out'
        />

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link 
          to="/"
          className='block text-center my-3 text-slate uppercase text-sm'
        >¿Ya tienes cuenta? Inicia Sesión</Link>
        <Link 
          to="/forget-password"
          className='block text-center my-3 text-slate uppercase text-sm'
        >Olvidé mi password</Link>
      </nav>
    </>
  )
}

export default Register;