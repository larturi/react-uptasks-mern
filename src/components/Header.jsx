import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
      <header className='px-4 py-5 bg-white border-b'>
         <div className='w-full block md:flex md:justify-between'>
            <h2 className='text-4xl my-5 text-sky-600 font-black text-center'>
               UpTasks
            </h2>

            <div className='flex items-center gap-4'>
               <input
                  type='search'
                  placeholder='Search Project'
                  className='rounded-lg lg:w-96 block m-auto p-2 border w-96 my-5 md:w-64'
               />

               <Link to='/projects' className='font-bold uppercase'>
                  Projects
               </Link>

               <button
                  type='button'
                  className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
               >
                  Logout
               </button>
            </div>
         </div>
      </header>
   );
};

export default Header;
