import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import ChangePassword from './pages/ChangePassword';
import ConfirmAccount from './pages/ConfirmAccount';
import ProtectedRoutes from './layouts/ProtectedRoutes';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';

import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';

function App() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <ProjectsProvider>
               <Routes>
                  <Route path='/' element={<AuthLayout />}>
                     <Route index element={<Login />} />
                     <Route path='register' element={<Register />} />
                     <Route
                        path='forget-password'
                        element={<ForgetPassword />}
                     />
                     <Route
                        path='forget-password/:token'
                        element={<ChangePassword />}
                     />
                     <Route
                        path='confirm-account/:token'
                        element={<ConfirmAccount />}
                     />
                  </Route>

                  <Route path='/projects' element={<ProtectedRoutes />}>
                     <Route index element={<Projects />} />
                     <Route
                        path='create-project'
                        element={<NewProject />}
                     ></Route>
                  </Route>
               </Routes>
            </ProjectsProvider>
         </AuthProvider>
      </BrowserRouter>
   );
}

export default App;
