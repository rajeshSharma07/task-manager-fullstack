import {useEffect, useState} from "react";
import  {useNavigate } from  "react-router-dom";
import axios from "axios";
 import "./Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Dashboard(){

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("");




    const handleCreateTask =async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/task/posttask`,
                {
                    title,
                    description,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);

            setTasks((prevTasks) => [response.data.task, ...prevTasks]);
           
            setTitle("");
            setDescription("");

        } catch (error){
            console.log(error.response?.data);
        }
    };

    const handleEditTask = (task) =>{
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
};
   

//update task
const handleUpdateTask = async (taskId) =>{


    try{
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/task/updatetask/${taskId}`,
            {
              title: editTitle,
              description: editDescription,
              status: editStatus,
           },
           {
            withCredentials: true,
           }
        );

        console.log( response.data);
        setTasks((prevTasks)=>
        prevTasks.map((task)=>
        task._id === taskId ? response.data.task :task)
    );

    setEditingTaskId(null);

    }catch (error){
      
    console.log(error.response?.data);
    }
};

// delete Task
const handleDeleteTask = async (taskId)=>{
    try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/task/deletetask/${taskId}`,
            {
                withCredentials: true,
            }
        );

        setTasks((prevTasks)=>
        prevTasks.filter((task)=> task._id !== taskId)
    );

    }catch (error){
        console.log(error.response?.data);
    }
};

//logout
 const handleLogout = async()=>{
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
    {
        withCredentials: true,
    }
);
console.log(response.data);

navigate("/");

    }catch (error){
        console.log(error.response?.data);
    }
 };


    useEffect(()=>{
        const getProfile =async()=>{
            try{
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/profile`,
                    {
                        withCredentials: true,
                    }
                );

                console.log(response.data);

                setUser(response.data.user);

            }catch (error){
                console.log(error.response?.data);
            }
        };

        getProfile();
    },[]);



    useEffect(() =>{
        const getTasks = async () =>{
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/task/gettask`,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);

            setTasks(response.data.tasks)
        }catch (error){
            console.log(error.response?.data);
        }
    };
    getTasks();
    },[]);

    return (
    <div className="dashboard">

        <Navbar 
            user={user}
            onLogout={handleLogout}
            isAuthenticated={true} 
        />

     {/* <nav className="navbar"> 
        <div className="navbar-brand">Task Manager</div>
        <div className="navbar-links">
            <a  className="active"href="/dashboard">Dashboard</a>
            <a href="/dashboard">My Tasks</a>
        </div>

    <div className="navbar-right">
    {user && (
        <div className="navbar-profile">
            <span className="navbar-name">{user.name}</span>
            <span className="navbar-email">{user.email}</span>
        </div>
    )}

    <button
        className="logout-btn"
        type="button"
        onClick={handleLogout}>Logout
    </button>
    
        </div>
    </nav> */}

           
            {/* {user && (
                <div className="profile-card">
                    <h2 className="profile-title">Profile</h2>
                    <p className="profile-text">Name: {user.name}</p>
                    <p className="profile-text">Email: {user.email}</p>
               </div>
        )} */}

    <div className="tasks-container">
        <h2 className="tasks-title">MY Tasks</h2>
        <form  className="task-form" onSubmit ={handleCreateTask}>
            <input  className="task-input" type="text" placeholder="Task title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input className="task-input" type="text" placeholder="Task description"  value={description} onChange={(e)=> setDescription(e.target.value)}/>
            <button className="add-task-btn" type="submit">Add Task</button>
        </form>

        <div className="task-list">
        { tasks.map((task)=>(
                <div  className="task-card" key ={task._id}>
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                    <p className="task-status">Status: {task.status}</p>

                 <div className="task-actions">
                    <button className="edit-btn" type="button" onClick = {() => handleEditTask(task)}>Edit</button>
                    <button className="delete-btn" type="button" onClick={() => handleDeleteTask(task._id)}> Delete</button>
                </div>

                    {editingTaskId === task._id && (
                        <div className="edit-form">
                            <input className="edit-input" type="text" value={editTitle} onChange={(e)=> setEditTitle(e.target.value)}/>
                            <input className="edit-input" type="text" value={editDescription} onChange={(e)=> setEditDescription(e.target.value)}/>

                            <select className="edit-select" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                               <option value="pending">Pending</option>
                               <option value="in-progress">In Progress</option>
                               <option value="completed">Completed</option>
                            </select>
                            
                        <div className="edit-actions">
                            <button className="update-btn" type="button" onClick={()=> handleUpdateTask(task._id)}>Update</button>
                            <button className="cancel-btn" type="button" onClick={()=> setEditingTaskId(null)}>Cancel</button>
                        
                            {/* <button type="button" onClick={()=> handleDeleteTask(task._id)}>Delete</button> */}
                        </div>
                        </div>
                    )}
                </div>
                
            ))
        }
        </div>
        </div>

          <Footer />

    </div>
)}
 
export default Dashboard;