import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';
import { data } from 'autoprefixer';

const Register = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if([nombre, email, password, password2].includes('')) {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      });
      return;
    }

    if(password.length < 6) {
      setAlerta({
        error: true,
        msg: 'El password debe tener al menos 6 caracteres'
      });
      return;
    }

    if(password !== password2) {
      setAlerta({
        error: true,
        msg: 'Los password no coinciden'
      });
      return;
    }

    setAlerta({});

    // Enviar el registro
    try {
      const { data } = await axios.post('http://localhost:4000/api/users', { nombre, email, password });
      setAlerta({
        error: false,
        msg: 'Ususario registrado con exito'
      });
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className='text-sky-600 font-black text-2xl mb-6 uppercase text-center'>
       Crea tu cuenta y administra tus <span className='text-slate-700'>proyectos</span>
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            placeholder='Repetir Password'
            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
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