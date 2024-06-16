import React, { useState,useCallback,useEffect } from 'react'
import './Projects.css'
import { useAcceptTeamInviteMutation, useDeclineTeamInviteMutation, useGetAvailibleTeamsMutation, useGetTeamInvitesMutation, useCreateTeamMutation } from '../../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import ok from '../Images/ok.png';
import cancel from '../Images/cancel.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Teams({hide,setTeams}) {

    const [name,setName] = useState('') ;

    const dispatch = useDispatch();

    const [invites,setInvites]=useState([])

    const [createTeam] = useCreateTeamMutation();

    const [getInvites] = useGetTeamInvitesMutation();
    const [acceptInvite] = useAcceptTeamInviteMutation();
    const [declineInvite] = useDeclineTeamInviteMutation();
    const [getAvailibleTeams] = useGetAvailibleTeamsMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        try{
            if(name === ''){
                e.preventDefault();
                toast.error("All inputs should be filled", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return
            }
            const res = await createTeam({auth:userInfo.token, name:name})  
            
        }catch(err){
 
        }
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
                    {invites.length === 0 ? (
                        <div style={{width:'90%', height:"80%", display:"flex", justifyContent:"center", color:"#7A7A7A"}}>No invitations yet</div>
                    ) : (
                    <div className='ProjectInvitesContainer'>
                        {invites.map(invite=>(
                            <div className='ProjectLinkContainer' key={invite.pk}>
                                <div className='ProjectLinkLeft'>
                                    <div style={{fontSize:'36px',paddingLeft:'20px'}}>{invite.team}</div>
                                </div>
                                <div className='ProjectLinkRight'>
                                    <img style={{height:'40px', paddingRight:'20px', cursor:'pointer'}} onClick={()=>acceptTeamInvite(invite.pk)} src={ok} alt="" />
                                    <img style={{height:'40px', paddingRight:'20px', cursor:'pointer'}} onClick={()=>declineTeamInvite(invite.pk)} src={cancel} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                <div className='CreateTeamForm'>
                    <form className='CreateProjectContainer' onSubmit={submitHandler}>
                        <div style={{fontSize:'36px',height:'10%',display:'flex',justifyContent:'center',alignItems:'center', marginBottom:'30px'}}>Create Team</div>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setName(e.target.value)}/>
                                <span className={name.length>0 ? "floating label dirty" : "floating label"} >Team Name</span>
                            </div>
                            <button className='CreateProjectButton' type='submit'>
                                    Create
                            </button>
                    </form>
                </div>
            </div>
            <ToastContainer theme="dark" />
        </div>
    )
}

export default Teams
