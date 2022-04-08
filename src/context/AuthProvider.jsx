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
            setAuth(data);
            navigate('/projects');
         } catch (error) {
            setAuth({});
            console.log(error);
         }
         setLoading(false);
      };
      authenticateUser();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            auth,
            loading,
            setAuth,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export { AuthProvider };

export default AuthContext;
