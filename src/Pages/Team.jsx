import React, { useState,useEffect,useCallback } from 'react'
import './Team.css'
import { useSelector } from 'react-redux';
import Header from './Components/MainPageComponents/Header';
import { useGetTeamMembersMutation, useGetTeamTasksMutation, useInviteUserToTeamMutation } from '../slices/usersApiSlice';
import { useParams } from 'react-router';

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
    marginRight:"20px"
}

function Team() {
    const {id} = useParams();

    const [tasks,setTasks] = useState([]);
    const [members,setMembers]=useState([]);

    const [userEmail,setUserEmail] = useState('');

    let testttt= (e)=>{ 
        setUserEmail(e.target.value)
        console.log(userEmail)
    }

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
            setMembers(res.data)
        }catch(err){
            console.log(err)
        }
    },[getTeamMembers,setMembers])

    const inviteUserToTeam = useCallback(async() =>{
        try{
            console.log(userEmail)
            let res = await inviteUser({auth:userInfo.token,team:id,user_get:userEmail,message:''})
            console.log(res)
        }catch(err){
            console.log(err)
        }
    },[getTeamMembers,setMembers])

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
                        <input style={customInput} placeholder="Invite User" onChange={(e)=>{testttt(e)}}/>
                        <div style={customAddUserPlusSign} onClick={()=>inviteUserToTeam()}>+</div>
                    </div>
                </div>
                <div className='GeneralContentContainer'>
                    <div className='TaskContentList'>
                    <div className='TaskTeamNaming'>Task's</div>
                        <div className='TeamTasksContainer'>
                        {tasks.map(item=>(
                            <div className='TeamTaskContainer' key={item.name}>
                                <div>
                                    <p style={{fontSize:'32px'}}>{item.name}</p>
                                </div>  
                                <div>
                                    <p style={{fontSize:'24px'}}>{item.group}</p>
                                </div>
                                <div>
                                    <p style={{fontSize:'24px'}}>{item.priority=="L"?'Low':item.priority=="M"?'Medium':item.priority=="H"?'High':null}</p>
                                </div>
                                <div className='CompletedIn'>2 days left</div>
                            </div>
                        ))}  
                        </div>
                    </div>
                    <div className='TaskContentList'>
                        <div className='TaskTeamNaming'>Task's</div>
                        <div className='TeamMemberListContainer'>
                            {members.map((member)=>(
                                <div className='TeamMemberContainer' key={member.id}>
                                    <img className='MemberAvatar' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/White_Square.svg/1200px-White_Square.svg.png'/>
                                    <div className='InnerSpacingContainer'>
                                        <p style={{fontSize:'32px'}}>{member.first_name + ' ' + member.last_name}</p>
                                        <p style={{fontSize:'24px',color:"#7A7A7A"}}>@{member.tag}</p>
                                        <p style={{fontSize:'24px'}}>{member.status}</p>
                                    </div>
                                </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Team
