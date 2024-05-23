import React, { useState,useCallback, useEffect } from 'react'
import './ProjectPageTasks.css'
import { useGetProjectTasksMutation, useCreateTaskMutation, useGetUsersInProjectMutation } from '../../../slices/usersApiSlice';
import { setProject } from '../../../slices/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import TaskContainer from './LocalComponents/TaskContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './LocalComponents/ConfirmationModal';

function ProjectPageTasks({}) {

    const [newTasks,setNewTasks]=useState([]);
    const [progressTasks,setProgressTasks]=useState([]);
    const [checkoutTasks,setCheckoutTasks]=useState([]);
    const [endedTasks,setEndedTasks]=useState([]);

    const [users,setUsers] = useState([]);

    const [taskName,setTaskName]=useState('');
    const [taskDescription,setTaskDescription]=useState('');
    const [taskStartDate,setTaskStartDate]=useState('');
    const [taskEndDate,setTaskEndDate]=useState('');
    const [taskPriority,setTaskPriority]=useState('');
    const [taskGroup,setTaskGroup]=useState('');
    const [taskUser,setTaskUser]=useState('');

    const [modalCreateTaskActive,setModalCreateTaskActive]=useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.project);

    const [getProjectTasks] = useGetProjectTasksMutation();
    const [createTask] = useCreateTaskMutation();
    const [getUsersInProject] = useGetUsersInProjectMutation();

    const getUsers = useCallback(async() =>{
        try{
            let res = await getUsersInProject({auth:userInfo.token,project:projectInfo.id})
            setUsers(res.data)
        }catch(err){
            console.log(err)
        }
    },[getUsersInProject,setUsers])

    const  getTasks= useCallback( async() =>{
        try{
        const res = await getProjectTasks({project:projectInfo.id,auth: userInfo.token});
        let n = [];
        setNewTasks([])
        let p = [];
        setProgressTasks([])
        let c = [];
        setCheckoutTasks([])
        let e = [];
        setEndedTasks([])
        console.log(res.data.data)
        res.data.data.forEach(task => {
            console.log(task)   
            if(task.status=='N'){
                n.push(task)
                console.log('N')
                setNewTasks(n)
                console.log(n)
            }
            if(task.status=='P'){
                p.push(task)
                console.log('p')
                setProgressTasks(p)
                console.log(p)
            }
            if(task.status=='C'){
                c.push(task)
                console.log('C')
                setCheckoutTasks(c)
                console.log(c)
            }
            if(task.status=='F'){
                e.push(task);
                console.log('F')
                setEndedTasks(e)
                console.log(e)
            }
        });}
        catch(err){
            console.log(err)
        }
    },[getProjectTasks,setNewTasks,setProgressTasks,setCheckoutTasks,setEndedTasks])

    const deleteNewTask = (id)=>{
        let items = newTasks.filter(task=>task.pk!==id)
        setNewTasks(items)
    }

    const deleteProgressTask = (id)=>{
        let items = progressTasks.filter(task=>task.pk!==id)
        setProgressTasks(items)
    }

    const deleteCheckoutTask = (id)=>{
        let items = checkoutTasks.filter(task=>task.pk!==id)
        setCheckoutTasks(items)
    }

    const deleteEndedTask = (id)=>{
        let items = endedTasks.filter(task=>task.pk!==id)
        setEndedTasks(items)
    }

    const submitHandler = async (e) => {
        try{
            e.preventDefault();
            if(taskName === '' || taskPriority === "" || taskDescription === "" || taskStartDate === "" || taskEndDate === "" || taskGroup === "" || taskUser === ""){
                toast.error("All inputs should be filled", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return
            }
            const res = await createTask({auth:userInfo.token, name:taskName, priority:taskPriority, description:taskDescription, start_date:taskStartDate, end_date:taskEndDate, group:taskGroup, email:taskUser, project:projectInfo.id})  
            if(res.data.name){
                toast.success("Task has been successfully created", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                setTaskName('');
                setTaskPriority('');
                setTaskDescription('');
                setTaskStartDate('');
                setTaskEndDate('');
                setTaskGroup('');
                setTaskUser('');
                getTasks();
            }
            
        }catch(err){
            toast.error("You do not have permission to perform this action.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    useEffect(()=>{
        getTasks();
        getUsers();
    },[getTasks, getUsers])

    return (
    <div className='ProjectPageTasksMainContentContainer'> 
        <TaskContainer color="FF7A00" type="New" tasks={newTasks} deleteTask={deleteNewTask} getTasks={getTasks}>
            <button onClick={setModalCreateTaskActive} style={{cursor:"pointer", fontSize:"32px", color:"#FF7A00", backgroundColor:"transparent", width:"40px", borderRadius:"5px"}}>+</button>
        </TaskContainer>
        <TaskContainer color="FAFF00" type="In progress" tasks={progressTasks} deleteTask={deleteProgressTask} getTasks={getTasks}/>
        <TaskContainer color="8DFF34" type="Checkout" tasks={checkoutTasks} deleteTask={deleteCheckoutTask} getTasks={getTasks}/>
        <TaskContainer color="00FF66" type="Finished" tasks={endedTasks} deleteTask={deleteEndedTask} getTasks={getTasks}/>
        <ConfirmationModal active={modalCreateTaskActive} setActive={setModalCreateTaskActive} customWidth={"30vw"}>
            <div className='CreateTaskHeader'>Create task</div>
            <form className='CreateTaskContainer' onSubmit={submitHandler}>
                <div className='CenterMainContainer'>
                    <div className='microInputContainer'>
                        <input className='FormInput' value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
                        <span className={taskName.length>0 ? "floating label dirty" : "floating label"} >Task Name</span>
                    </div>
                    <div className='microInputContainer'>
                        <select className='TaskUserSelect' value={taskPriority} onChange={(e)=>setTaskPriority(e.target.value)}>
                            <option hidden>Select a priority</option>
                            <option value={"L"} style={{color:"#00FF66"}}>Low</option>
                            <option value={"M"} style={{color:"#FF7A00"}}>Medium</option>
                            <option value={"H"} style={{color:"#FF3E3E"}}>High</option>                 
                        </select>
                    </div>
                     <div className='microInputContainer'>
                        <input className='FormInput' type='date' value={taskStartDate} style={taskStartDate?{color:'white'}:{color:'transparent'}} onChange={(e)=>setTaskStartDate(e.target.value)}/>
                        <span className={taskStartDate.length>0 ? "floating label dirty" : "floating label"} >Start date</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' type='date' style={taskEndDate?{color:'white'}:{color:'transparent'}} value={taskEndDate} onChange={(e)=>setTaskEndDate(e.target.value)}/>
                        <span className={taskEndDate.length>0 ? "floating label dirty" : "floating label"} >End date</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)}/>
                        <span className={taskDescription.length>0 ? "floating label dirty" : "floating label"} >Description</span>
                    </div>
                    <div className='microInputContainer'>
                        <input className='FormInput' value={taskGroup} onChange={(e)=>setTaskGroup(e.target.value)}/>
                        <span className={taskGroup.length>0 ? "floating label dirty" : "floating label"} >Task Group</span>
                    </div>
                    <div className='microInputContainer'>
                        <select className='TaskUserSelect' value={taskUser} onChange={(e)=>setTaskUser(e.target.value)}>
                            <option hidden>Select a user</option>
                            {users.map((user)=>(
                                <option key={user.id} value={user.id}>{user.email}</option>
                            ))}                    
                        </select>
                    </div>
                     <button className='CreateProjectButton' type='submit'>
                            Create
                    </button>
                </div>
            </form>
        </ConfirmationModal>
        <ToastContainer theme="dark" />
    </div>
    )
}

export default ProjectPageTasks
