import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState({});

   useEffect(() => {
      const autenticarUsuario = async () => {
         // Comprueba si hay un token en localStorage
         const token = localStorage.getItem('token');

         if (!token) {
            return;
         }

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         };

         // Si hay un token, pide info del usuario al backend
         try {
            const { data } = await clienteAxios.get('/users/profile', config);
            setAuth(data);
         } catch (error) {
            console.log(error);
         }
      };
      autenticarUsuario();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            setAuth,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export { AuthProvider };

export default AuthContext;
