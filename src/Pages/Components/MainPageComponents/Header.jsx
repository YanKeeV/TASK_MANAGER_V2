import React, { useCallback, useEffect, useState } from 'react'
import './Header.css'
import logout from '../Images/logout.png'
import { setProject } from '../../../slices/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom'
import CreateProjects from './CreateProjects';
import Teams from './Teams';
import { clearLocalStorageAndState } from '../../../slices/authSlice';
import { setTeam } from '../../../slices/teamsSlice';
import { useGetAvailibleProjectsMutation, useGetAvailibleTeamsMutation} from '../../../slices/usersApiSlice';
function Header({activeTab}) {


    const [currentTab,setCurrentTab] = useState('');
    const [hide,setHide] = useState(false);
    const [show,setShow] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();

    const [allProjects,setAllProjects]= useState([]);
    const [allTeams,setAllTeams] = useState([])

    const [getAvailibleProjects] = useGetAvailibleProjectsMutation();
    const [getAvailibleTeams] = useGetAvailibleTeamsMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const { certainUserInfo } = useSelector((state) => state.certainUser);

    const getAllProjects = useCallback(async()=>{
        try{
        const res = await getAvailibleProjects({auth:userInfo.token,status:'all'})
        setAllProjects(res.data.data)
        }catch(err){
            console.log(err)
        }
    },[getAvailibleProjects,setAllProjects])

    const getAllTeams = useCallback(async()=>{
        try{
        const res = await getAvailibleTeams({auth:userInfo.token})
        setAllTeams(res.data.data)
        }catch(err){
            console.log(err)
        }
    },[getAvailibleTeams,setAllTeams])
    

   useEffect(()=>{
    setCurrentTab(activeTab);
    getAllProjects();
    getAllTeams();
   },[setCurrentTab,getAllProjects,getAllTeams])

    const logoutFunc =()=>{
        dispatch(clearLocalStorageAndState())
        navigate("/")
    }

   const stateHandler = (value)=>{
        if(typeof(value)=='string'){
        if(value == "Projects"){
            setHide(false)
            setShow(!show)     
            setCurrentTab('Projects')
        }else if(value=="Teams"){
             
            setHide(true)
            setShow(false)
            setCurrentTab('Teams')
        }else if(value=="DashBoard"){

            setHide(false)
            setShow(false)     
            setCurrentTab('Dashboard')
        }else if(value=="Files"){
            setHide(false)
            setShow(false)
        }else if(value=="Profile"){
            setHide(false)
            setShow(false)
            setCurrentTab('Profile')
        }}else if(typeof(value)=='object'){
           if(value.name="Project"){
                 
                setHide(false)
                setShow(false)
                 
                 
                dispatch(setProject(value.project))
           }
        }
   }

    return (
        <div className='Header'>
            <div className='SpacingContainer'>
                <div className='Heading'>CyberWeb</div>

                    <div className='Heading' style={currentTab=='Dashboard'?{fontSize:'32px',background:'#464646',borderRadius:'10px'}:{fontSize:'32px'}} onClick={()=>stateHandler("DashBoard")}><Link to={`/`} style={{color:"white",textDecoration:"none"}}>Dashboard</Link></div>
                <div className='Heading' style={show==true? {fontSize:'32px',background:'#464646',borderRadius:'10px'}:{fontSize:'32px'}} onClick={()=>stateHandler("Projects")}>Projects</div>
                <div className='AccordionContent' style={show==true ? {display:'block'}:{display:'none'}}>
                            {allProjects.map(project=>(
                                <Link to={`/project/${project.id}`} style={{color:"white",textDecoration:"none"}} onClick={()=>dispatch(setProject(project))} key={project.id} >
                                <div style={{fontSize:'32px',paddingLeft:'20px'}} onClick={()=>stateHandler({name:'Project',project:project})} >
                                    {project.name}
                                </div>
                                </Link>
                            ))}
                </div>
                <div className='Heading' style={!hide ? {fontSize:'32px'}:{fontSize:'32px',background:'#464646',borderRadius:'10px'}} onClick={()=>stateHandler("Teams")}>Teams</div>
                <div className='AccordionContent' style={hide == true ? {display:'block'}:{display:'none'}}>
                            {allTeams.map(team=>(
                                <Link to={`/team/${team.id}`} style={{color:"white",textDecoration:"none"}} onClick={()=>dispatch(setTeam(team))} key={team.id}>
                                <div style={{fontSize:'32px',paddingLeft:'20px'}} onClick={()=>stateHandler("Team")}>
                                    {team.name}
                                </div>
                                </Link>
                            ))}
                </div>
                <div className='Heading' style={currentTab=='Archive'?{fontSize:'32px',background:'#464646',borderRadius:'10px'}:{fontSize:'32px'}}>
                    <Link to={'/archive'} style={{color:"white",textDecoration:"none"}}>Archive</Link>
                </div>
                <div className='Heading' style={currentTab!='Files' ? {fontSize:'32px'}:{fontSize:'32px',background:'#464646',borderRadius:'10px'}} onClick={()=>stateHandler("Files")}>
                    Files
                </div>
            </div>
            
            <div className='SpacingContainer2' >
                <Link to={`/profile`} className='ContentContainer'  style={currentTab=='Profile'?{color:"white",textDecoration:"none",background:'#464646',borderRadius:'20px'}:{color:"white",textDecoration:"none"}} onClick={()=>{setShow(false);navigate('/profile')}}>
                        <img style={{width:'80px',height:'80px',borderRadius:'50%', border:'1px solid black'}}  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/White_Square.svg/1200px-White_Square.svg.png"/>
                        <div className='UserContentContainer'>
                            <div>{certainUserInfo.first_name + ' ' + certainUserInfo.last_name}</div>
                            <div>@{certainUserInfo.tag}</div>
                        </div>
                </Link>
       
                <div className='UserActions' onClick={()=>logoutFunc()}>
                    <div>Logout</div>
                    <img style={{width:'39px',height:'39px'}} src={logout}/>
                </div>
                </div>
            <CreateProjects show={show} setProjects={setAllProjects}/>
            <Teams hide={hide} setTeams={setAllTeams}/>
        </div>
    )
}

export default Header
