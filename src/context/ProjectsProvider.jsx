import { useEffect, useState, createContext } from 'react';
import clientAxios from '../config/clientAxios';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
   const [projects, setProjects] = useState([]);
   const [alerta, setAlerta] = useState({});
   const [project, setProject] = useState({});

   const navigate = useNavigate();

   useEffect(() => {
      const getProjects = async () => {
         try {
            const config = getConfig();
            const { data } = await clientAxios.get('/projects', config);
            setProjects(data);
            setProjects(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getProjects();
   }, []);

   const mostrarAlerta = (alerta) => {
      setAlerta(alerta);
      setTimeout(() => {
         setAlerta({});
         navigate('/projects');
      }, 1000);
   };

   const submitProject = async (project) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.post('/projects', project, config);

         setProjects([...projects, data]);
         mostrarAlerta({
            msg: 'Projecto creado correctamente',
            error: false,
         });
      } catch (error) {
         mostrarAlerta({
            msg: 'Error al crear el proyecto',
            error: true,
         });
      }
   };

   const getProject = async (id) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.get(`/projects/${id}`, config);
         setProject(data);
      } catch (error) {
         console.log(error);
      }
   };

   const getConfig = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      return {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
      };
   };

   return (
      <ProjectsContext.Provider
         value={{
            projects,
            project,
            alerta,
            mostrarAlerta,
            submitProject,
            getProject,
            setProject,
         }}
      >
         {children}
      </ProjectsContext.Provider>
   );
};

export { ProjectsProvider };

export default ProjectsContext;
