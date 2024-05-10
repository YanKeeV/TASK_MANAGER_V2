import React, { useState,useCallback,useEffect } from 'react'
import './Projects.css'
import { useAcceptTeamInviteMutation, useDeclineTeamInviteMutation, useGetAvailibleTeamsMutation, useGetTeamInvitesMutation } from '../../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';


function Teams({hide,setTeams}) {

    const [name,setName] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [description,setDescription] = useState('');
    const [start_date,setStartDate] = useState('');
    const [end_date,setEndDate] = useState('');

    const dispatch = useDispatch();

    const [invites,setInvites]=useState([])

    const [getInvites] = useGetTeamInvitesMutation();
    const [acceptInvite] = useAcceptTeamInviteMutation();
    const [declineInvite] = useDeclineTeamInviteMutation();
     const [getAvailibleTeams] = useGetAvailibleTeamsMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        console.log('kek')
    };

    const getTeamInvites = useCallback(async()=>{
        try{
            const res = await getInvites({auth:userInfo.token,pk:userInfo.user_id})
            setInvites(res.data)
        }catch(err){
            console.log(err)
        }
    },[setInvites,getInvites])

    const acceptTeamInvite = async(id)=>{
        try{
            const res = await acceptInvite({auth:userInfo.token,invite:id})
            console.log(res)
            getTeamInvites();
            const res2 = await getAvailibleTeams({auth:userInfo.token})
            setTeams(res2.data.data)
        }catch(err){
            console.log(err)
        }
    }

    const declineTeamInvite = async(id)=>{
        try{
            const res = await declineInvite({auth:userInfo.token,invite:id})
            console.log(res)
            getTeamInvites();
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getTeamInvites();
    },[getTeamInvites])

    return (
        <div className='ProjectsContainer' style={hide?{}:{display:'none',top:"-100vh"}}>
            <div className='ProjectsContentContainer'>
                <div className='ProjectInvites'>
                    <div style={{fontSize:'36px',height:'10%',display:'flex',justifyContent:'center',alignItems:'center'}}>Team Invites</div>
                    <div className='ProjectInvitesContainer'>
                    {invites.map(invite=>(
                        <div className='ProjectLinkContainer' key={invite.pk}>
                            <div className='ProjectLinkInnerContainer'>
                                <div style={{fontSize:'36px',paddingLeft:'20px'}}>{invite.team}</div>
                                <div style={{fontSize:'36px'}} onClick={()=>acceptTeamInvite(invite.pk)}>+</div>
                                <div style={{fontSize:'36px'}} onClick={()=>declineTeamInvite(invite.pk)}>-</div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className='CreateProjectForm'>
                <div style={{fontSize:'36px',height:'10%',display:'flex',justifyContent:'center',alignItems:'center'}}>Create Team</div>
                    <form className='CreateProjectContainer' onSubmit={submitHandler}>
                        <div className='CenterMainContainer'>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setName(e.target.value)}/>
                                <span className={name.length>0 ? "floating label dirty" : "floating label"} >Team Name</span>
                            </div>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setPassword(e.target.value)}/>
                                <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
                            </div>
                            <div className='microInputContainer'>
                                <input className='FormInput' type='date'  style={start_date?{color:'white'}:{color:'transparent'}} onChange={(e)=>setStartDate(e.target.value)}/>
                                <span className={start_date.length>0 ? "floating label dirty" : "floating label"} >Start date</span>
                            </div>
                            <div className='microInputContainer'>
                                <input className='FormInput' type='date' style={end_date?{color:'white'}:{color:'transparent'}} value={end_date} onChange={(e)=>setEndDate(e.target.value)}/>
                                <span className={end_date.length>0 ? "floating label dirty" : "floating label"} >End date</span>
                            </div>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setDescription(e.target.value)}/>
                                <span className={description.length>0 ? "floating label dirty" : "floating label"} >Description</span>
                            </div>
                            <button className='CreateProjectButton' type='submit'>
                                    Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Teams
