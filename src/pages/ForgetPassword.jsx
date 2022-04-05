import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';

const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setAlerta({});

    // Regex to check if email is valid
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { 
      setAlerta({
        error: true,
        msg: 'Email inválido'
      });
      return;
    } else {
      setAlerta({});
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className='text-sky-600 font-black text-3xl mb-6 uppercase text-center'>
       Recuperar mi <span className='text-slate-700'>password</span>
      </h1>

      {
        msg && (
          <Alert alert={alerta} />
        )
      }

      <form 
        className='my-2 bg-white shadow rounded-lg p-10'
        onSubmit={handleSubmit}
      >

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value="Enviar instrucciones"
          className='w-full mb-2 mt-2 p-3 bg-sky-600 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-color duration-300 ease-in-out'
        />

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link 
          to="/"
          className='block text-center my-3 text-slate uppercase text-sm'
        >¿Ya tienes cuenta? Inicia Sesión</Link>
        <Link 
          to="/register"
          className='block text-center my-5 text-slate uppercase text-sm'
        >¿No tienes una cuenta? Registrar</Link>
      </nav>
    </>
  )
}

export default ForgetPassword;