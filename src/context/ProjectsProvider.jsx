import { useEffect, useState, createContext } from 'react';
import clientAxios from '../config/clientAxios';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
   const [projects, setProjects] = useState([]);
   const [alerta, setAlerta] = useState({});
   const [project, setProject] = useState({});
   const [loading, setLoading] = useState({});
   const [modalFormTask, setModalFormTask] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      const getProjects = async () => {
         try {
            const config = getConfig();
            const { data } = await clientAxios.get('/projects', config);
            setProjects(data);
         } catch (error) {
            console.error(error);
         }
      };
      getProjects();
   }, []);

   const mostrarAlerta = (alerta) => {
      setAlerta(alerta);
      setTimeout(() => {
         setAlerta({});
         if (alerta.redirectToProjects) {
            navigate('/projects');
         }
      }, 1000);
   };

   const submitProject = async (project) => {
      if (project.id) {
         await editProject(project);
      } else {
         await newProject(project);
      }
   };

   const editProject = async (project) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.put(
            `/projects/${project.id}`,
            project,
            config
         );

         const proyectosActualizados = projects.map((proyectoState) =>
            proyectoState._id === data._id ? data : proyectoState
         );
         setProjects(proyectosActualizados);

         mostrarAlerta({
            msg: 'Projecto actualizado correctamente',
            error: false,
            redirectToProjects: true,
         });
      } catch (error) {
         console.log(error);
         mostrarAlerta({
            msg: 'Error al actualizar el proyecto',
            error: true,
         });
      }
   };

   const newProject = async (project) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.post('/projects', project, config);

         setProjects([data, ...projects]);
         mostrarAlerta({
            msg: 'Projecto creado correctamente',
            error: false,
            redirectToProjects: true,
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
         setLoading(true);
         const config = getConfig();
         const { data } = await clientAxios.get(`/projects/${id}`, config);
         setProject(data);
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   const deleteProject = async (id) => {
      try {
         const config = getConfig();
         await clientAxios.delete(`/projects/${id}`, config);
         const proyectosActualizados = projects.filter(
            (proyectoState) => proyectoState._id !== id
         );
         setProjects(proyectosActualizados);
         mostrarAlerta({
            msg: 'Proyecto eliminado correctamente',
            error: false,
            redirectToProjects: true,
         });
      } catch (error) {
         mostrarAlerta({
            msg: 'Error al eliminar el proyecto',
            error: true,
         });
      }
   };

   const handleModalFormTask = () => {
      setModalFormTask(!modalFormTask);
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
            loading,
            mostrarAlerta,
            submitProject,
            getProject,
            setProject,
            deleteProject,
            handleModalFormTask,
            modalFormTask,
         }}
      >
         {children}
      </ProjectsContext.Provider>
   );
};

export { ProjectsProvider };

export default ProjectsContext;
