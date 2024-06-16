import React, { useState,useEffect,useCallback } from 'react'
import './Team.css'
import { useSelector } from 'react-redux';
import Header from './Components/MainPageComponents/Header';
import { useGetTeamMembersMutation, useGetTeamTasksMutation, useInviteUserToTeamMutation } from '../slices/usersApiSlice';
import { useParams } from 'react-router';
import user_png from '../Pages/Components/Images/user.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskComponent from './Components/ProjectPageComponents/LocalComponents/TaskComponent'

let customInput ={
    marginLeft:'20px',
    fontSize:'36px',
    width:'300px',
    border:'none',
    background:'none',
    color:'white'
}

let customAddUserPlusSign={
    fontSize:'60px',
    width:'60px',
    textAlign:'right',
    marginRight:"20px",
    background:'transparent',
    border:'none',
    cursor:'pointer'
}

function Team() {
    const {id} = useParams();

    const [tasks,setTasks] = useState([]);
    const [members,setMembers]=useState([]);

    const [teamInviteTag,setTeamInviteTag] = useState('');

    const { userInfo } = useSelector((state) => state.auth);
    
    const [getTeamTasks] = useGetTeamTasksMutation();
    const [getTeamMembers] = useGetTeamMembersMutation();
    const [inviteUser] = useInviteUserToTeamMutation();

    const getTasks = useCallback(async() =>{
        try{
            console.log('kek')
            let res = await getTeamTasks({auth:userInfo.token,team:id})
            console.log(res)
            setTasks(res.data.data)
        }catch(err){
            console.log(err)
        }
    },[getTeamTasks,setTasks])

    const getMembers = useCallback(async() =>{
        try{
            let res = await getTeamMembers({auth:userInfo.token,team:id})
            console.log(res)
            setMembers(res.data.data)
        }catch(err){
            console.log(err)
        }
    },[getTeamMembers,setMembers])

    const inviteUserToTeam = async() =>{
        try{
            const res = await inviteUser({auth:userInfo.token,team:id,user_get:teamInviteTag,message:''})  
            console.log(res)
            if(res.error.status){
                toast.error(res.error.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                toast.error(res.error.data.detail, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            
        }catch(err){
            toast.success("Invitation has been successfully sent", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });  
        }
    }

    useEffect(()=>{
        getTasks();
        getMembers()
    },[getTasks,getMembers])

    return (
    <div className='GlobalTeamContainer'>
        <Header/>
        <div className='TeamContainer'>
            <div className='TeamContentContainer'>
                <div className='TeamInviteInputContainer'>
                <div className='userInviteContainer'>
                        <input style={customInput} placeholder="Invite User" onChange={(e)=>setTeamInviteTag(e.target.value)}/>
                        <button style={customAddUserPlusSign} onClick={()=>inviteUserToTeam()}>+</button>
                    </div>
                </div>
                <div className='GeneralContentContainer'>
                    <div className='TaskContentList'>
                        <div className='TaskTeamNaming'>Task's</div>
                        <div className='TeamTasksContainer'>
                            {tasks.map(item=>(
                                <TaskComponent key={item.pk} task={item} getTasks={getTasks}/>
                            ))}  
                        </div>
                    </div>
                        <div className='TaskContentList'>
                            <div className='TaskTeamNaming'>User's</div>
                            <div className='TeamMemberListContainer'>
                                {members.map((member)=>(
                                    <div className='TeamMemberContainer' key={member.id}>
                                        <img className='MemberAvatar' src={member.image ?? user_png}/>
                                        <div className='InnerSpacingContainer'>
                                            <p style={{fontSize:'32px'}}>{member.first_name + ' ' + member.last_name}</p>
                                            <p style={{fontSize:'24px',color:"#7A7A7A"}}>@{member.tag}</p>
                                            <p style={{fontSize:'24px', marginTop:'3px'}}>{member.status}</p>
                                        </div>
                                    </div>
                                    ))}
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <ToastContainer theme="dark" />
    </div>
    )
}

export default Team
