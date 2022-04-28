import { useEffect, useState, createContext } from 'react';
import clientAxios from '../config/clientAxios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';

let socket;

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
   const [projects, setProjects] = useState([]);
   const [alerta, setAlerta] = useState({});
   const [project, setProject] = useState({});
   const [loading, setLoading] = useState({});
   const [modalFormTask, setModalFormTask] = useState(false);
   const [modalDeleteTask, setModalDeleteTask] = useState(false);
   const [tarea, setTarea] = useState({});
   const [collaborator, setCollaborator] = useState({});
   const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
   const [buscador, setBuscador] = useState(false);

   const navigate = useNavigate();

   const { auth } = useAuth();

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
   }, [auth]);

   useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL);
   }, []);

   const mostrarAlerta = (alerta) => {
      setAlerta(alerta);
      setTimeout(() => {
         setAlerta({});
         if (alerta.redirectToProjects) {
            navigate('/projects');
         }
      }, 3000);
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
         const { data } = await clientAxios.put(`/projects/${project.id}`, project, config);

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
         navigate('/projects');
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         });
         setTimeout(() => {
            setAlerta({});
         }, 2000);
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   const deleteProject = async (id) => {
      try {
         const config = getConfig();
         await clientAxios.delete(`/projects/${id}`, config);
         const proyectosActualizados = projects.filter((proyectoState) => proyectoState._id !== id);
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
      setTarea({});
   };

   const handleModalEditarTarea = (task) => {
      setTarea(task);
      setModalFormTask(true);
   };

   const submitTask = async (task) => {
      if (task.id) {
         await editarTarea(task);
      } else {
         await crearTarea(task);
      }
   };

   const crearTarea = async (task) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.post(`/tasks`, task, config);
         mostrarAlerta({});
         setModalFormTask(false);

         // Socket
         socket.emit('newTask', data);
      } catch (error) {
         console.error(error);
      }
   };

   const editarTarea = async (task) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

         mostrarAlerta({});
         setModalFormTask(false);

         //Socket
         socket.emit('editTask', data);
      } catch (error) {
         console.error(error);
      }
   };

   const handleModalEliminarTarea = (task) => {
      setTarea(task);
      setModalDeleteTask(!modalDeleteTask);
   };

   const deleteTask = async () => {
      try {
         const config = getConfig();
         await clientAxios.delete(`/tasks/${tarea._id}`, config);

         setAlerta({
            msg: 'Tarea eliminada correctamente',
            error: false,
         });
         setModalDeleteTask(false);

         // Socket
         socket.emit('deleteTask', tarea);
         setTarea({});
         setTimeout(() => {
            setAlerta({});
         }, 2500);
      } catch (error) {
         console.error(error);
      }
   };

   const submitCollaborator = async (email) => {
      setLoading(true);
      try {
         const config = getConfig();
         const { data } = await clientAxios.post(`/projects/collaborators`, { email }, config);
         setCollaborator(data);
         setAlerta({});
      } catch (error) {
         setAlerta({
            msg: 'Usuario no encontrado',
            error: true,
         });
         console.error(error.response);
      } finally {
         setLoading(false);
      }
   };

   const addCollaborator = async (email) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.post(
            `/projects/collaborators/${project._id}`,
            { email },
            config
         );
         setAlerta({
            msg: 'Colaborador agregado correctamente',
            error: false,
         });
         setCollaborator({});
         setAlerta({});
         navigate(`/projects/${project._id}`);
      } catch (error) {
         let msgError = 'Error al agregar el colaborador';
         switch (error.response.data.msg) {
            case 'user_is_creator':
               msgError = 'El usuario es el creador del proyecto';
               break;

            case 'user_already_in_project':
               msgError = 'El usuario ya es colaborador de este proyecto';
               break;

            default:
               break;
         }
         setAlerta({
            msg: msgError,
            error: true,
         });
         console.error(error.response);
      }
   };

   const handleModalDeleteCollaborator = (colaborador) => {
      setModalDeleteCollaborator(!modalDeleteCollaborator);
      setCollaborator(colaborador);
   };

   const deleteCollaborator = async () => {
      try {
         const config = getConfig();
         await clientAxios.post(
            `/projects/collaborator-delete/${project._id}`,
            { id: collaborator._id },
            config
         );
         setAlerta({
            msg: 'Colaborador eliminado correctamente',
            error: false,
         });
         setCollaborator({});
         handleModalDeleteCollaborator();

         const proyectosActualizado = { ...project };
         proyectosActualizado.colaboradores = proyectosActualizado.colaboradores.filter(
            (colaboradorState) => colaboradorState._id !== collaborator._id
         );
         setProject(proyectosActualizado);
      } catch (error) {
         setAlerta({
            msg: 'Error al eliminar el colaborador',
            error: true,
         });
      }
   };

   const completarTarea = async (tareaId) => {
      try {
         const config = getConfig();
         const { data } = await clientAxios.post(`/tasks/estado/${tareaId}`, {}, config);
         mostrarAlerta({});

         // Socket
         socket.emit('completeTask', data);
      } catch (error) {
         console.error(error);
      }
   };

   const handleBuscador = () => {
      setBuscador(!buscador);
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

   // Socket IO
   const submitTareasProyecto = (task) => {
      const proyectosActualizado = { ...project };
      proyectosActualizado.tareas = [task, ...proyectosActualizado.tareas];
      setProject(proyectosActualizado);
   };

   const eliminarTareaProyecto = (task) => {
      const proyectosActualizado = { ...project };
      proyectosActualizado.tareas = proyectosActualizado.tareas.filter(
         (tareaState) => tareaState._id !== task._id
      );
      setProject(proyectosActualizado);
   };

   const editarTareaProyecto = (task) => {
      const proyectosActualizado = { ...project };
      proyectosActualizado.tareas = proyectosActualizado.tareas.map((tareaState) =>
         tareaState._id === task._id ? task : tareaState
      );
      setProject(proyectosActualizado);
   };

   const completarTareaProyecto = (task) => {
      const proyectosActualizado = { ...project };
      proyectosActualizado.tareas = proyectosActualizado.tareas.map((tareaState) =>
         tareaState._id === task._id ? { ...tareaState, estado: task.estado } : tareaState
      );
      setProject(proyectosActualizado);
   };

   const cerrarSesionProyectos = () => {
      setProjects([]);
      setProject({});
      setAlerta({});
   }

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
            submitTask,
            handleModalEditarTarea,
            tarea,
            handleModalEliminarTarea,
            modalDeleteTask,
            deleteTask,
            submitCollaborator,
            collaborator,
            setCollaborator,
            addCollaborator,
            handleModalDeleteCollaborator,
            modalDeleteCollaborator,
            deleteCollaborator,
            completarTarea,
            handleBuscador,
            buscador,
            submitTareasProyecto,
            eliminarTareaProyecto,
            editarTareaProyecto,
            completarTareaProyecto,
            cerrarSesionProyectos,
         }}
      >
         {children}
      </ProjectsContext.Provider>
   );
};

export { ProjectsProvider };

export default ProjectsContext;
