import React from 'react';

const ChangePassword = () => {
  return (
    <>
      <h1 className='text-sky-600 font-black text-3xl mb-6 uppercase text-center'>
       Reestablece tu password 
      </h1>

      <form className='my-2 bg-white shadow rounded-lg p-10'>
        <div className='my-3'>
          <label 
            className='uppercase text-gray-600 block font-bold'
            htmlFor='password'
          >Nuevo Password</label>
          <input 
            type="password"
            id='password'
            placeholder='Escribe tu Nuevo Password'
            className='w-full mt-3 p-3 border rounded-md bg-gray-50'
          />
        </div>

        <input 
          type="submit" 
          value="Confirmar Password"
          className='w-full mb-2 mt-2 p-3 bg-sky-600 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-sky-800 transition-color duration-300 ease-in-out'
        />
      </form>
    </>
  )
}

export default ChangePassword;