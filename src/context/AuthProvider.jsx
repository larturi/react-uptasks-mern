import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState({});
   const [loading, setLoading] = useState(true);

   const navigate = useNavigate();
   useEffect(() => {
      const authenticateUser = async () => {
         // Check if there is a token in localStorage
         const token = localStorage.getItem('token');

         if (!token) {
            setLoading(false);
            return;
         }

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         };

         // If the token is there, get the user info
         try {
            const { data } = await clientAxios.get('/users/profile', config);
            data.id = data._id;
            delete data._id;
            setAuth(data);
         } catch (error) {
            setAuth({});
            console.error(error);
         }
         setLoading(false);
      };
      authenticateUser();
   }, []);

   const cerrarSesionAuth = () => {
      setAuth({});
   }

   return (
      <AuthContext.Provider
         value={{
            auth,
            loading,
            setAuth,
            cerrarSesionAuth,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export { AuthProvider };

export default AuthContext;
