import React, { useState,useEffect,useCallback } from 'react'
import './DashBoard.css'
import { useDispatch, useSelector } from 'react-redux';
import { setProject } from '../../../slices/projectsSlice';
import { Link, useNavigate } from 'react-router-dom'
import { useGetAvailibleProjectsMutation, useGetTasksForUserMutation } from '../../../slices/usersApiSlice';
import project_managment from '../Images/project.png';
import TaskComponent from '../ProjectPageComponents/LocalComponents/TaskComponent'

function DashBoard() {

    const [latestProjects, setLatestProjects] = useState([]);
    const [tasks,setTasks] = useState([]);

    const { certainUserInfo } = useSelector((state) => state.certainUser);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [getAvailibleProjects] = useGetAvailibleProjectsMutation();
    const [getUserTasks] = useGetTasksForUserMutation();

    const getTasks = useCallback(async() =>{
        try{
            let res = await getUserTasks({auth:userInfo.token})
            console.log(res)
            setTasks(res.data.data)
        }catch(err){
            console.log(err)
        }
    },[getUserTasks,setTasks])

    const  getProjects= useCallback( async() =>{
        const res = await getAvailibleProjects({auth: userInfo.token, status:'all'});
        let c = []
        let i=0;
        res.data.data.forEach(project => {
            if(i<res.data.data.length && i<3){
                c.push(project)
            }
            i++;
        });
        console.log(res)
        setLatestProjects(c)
    },[getAvailibleProjects,setLatestProjects])

    useEffect(()=>{
        getProjects();
        getTasks();
    },[getProjects, getTasks])


    return (
        <div className='DashBoardContentContainer'>
            <div style={{width:'100%', display:'flex', justifyContent:'center',alignItems:'center'}}>
                <div style={{fontSize:"40px", width:'86%'}}>
                    Welcome, {certainUserInfo.first_name} {certainUserInfo.last_name}
                </div>
            </div>
            
            <div className='UpperContent'>
                {latestProjects.map(project => (
                    <Link to={`/project/${project.id}`} style={{color:"white",textDecoration:"none"}} onClick={()=>dispatch(setProject(project))} key={project.id} >
                        <div className='DashboardProjectContainer'>
                            <img className='DashboardProjectImage' src={project_managment} />
                            <div className='ProjectText'>
                                <span style={{fontSize:'40px'}}>{project.name}</span> <br />
                                <span style={{fontSize:'32px'}}>{Math.ceil((new Date(project.finish_date).getTime() - new Date(project.start_date).getTime())/(1000 * 3600 * 24))} days left</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='LowerContent'>
                <div className='LowerContentContainer'>
                    <div className='TaskContainer'>
                        <div style={{marginBottom:'15px'}}>Task for today</div>
                        <div className='TodayTaskContainer'>
                            {tasks.map(item=>(
                                <div style={{marginBottom:"10px", width:"100%", paddingRight:"10px"}}>
                                    <TaskComponent key={item.pk} task={item} getTasks={getTasks}/>
                                </div>
                            ))}  
                        </div>
                    </div>

                    <div className='TimePartlineContainer'>
                        <div style={{marginBottom:'15px'}}>Timeline</div>
                        <div className='TimelineContainer'>
                            <div className='InDevTag'>
                                In dev
                            </div>
                            <div className='InDevHint'>
                                *there will be a calendar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
