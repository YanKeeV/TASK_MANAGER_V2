import React, { useState,useEffect, useCallback } from 'react'
import './Projects.css'
import { useGetInvitesMutation,useAcceptProjectInviteMutation,useDeclineProjectInviteMutation, useGetAvailibleProjectsMutation, useCreateProjectMutation } from '../../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import ok from '../Images/ok.png';
import cancel from '../Images/cancel.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProjects({show,setProjects}) {

    const [name,setName] = useState('') ;
    const [status,setStatus] = useState('') ;
    const [description,setDescription] = useState('');
    const [start_date,setStartDate] = useState('');
    const [end_date,setEndDate] = useState('');

    const dispatch = useDispatch();

    const [invites,setInvites]=useState([])

    const [createProject] = useCreateProjectMutation();

    const [getInvites] = useGetInvitesMutation();
    const [acceptInvite] = useAcceptProjectInviteMutation();
    const [declineInvite] = useDeclineProjectInviteMutation();
    const [getAvailibleProjects] = useGetAvailibleProjectsMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        try{
            if(name === '' || status === "" || description === "" || start_date === "" || end_date === ""){
                e.preventDefault();
                toast.error("All inputs should be filled", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return
            }
            const res = await createProject({auth:userInfo.token, name:name, status:status, description:description, start_date:start_date, finish_date:end_date})  
            
        }catch(err){
 
        }
    };

    const getProjectInvites = useCallback(async()=>{
        try{
            const res = await getInvites({auth:userInfo.token,pk:userInfo.user_id})
            setInvites(res.data.data)
            console.log(invites.length)
        }catch(err){
            console.log(err)
        }
    },[setInvites,getInvites])

    const acceptProjectInvite = async(id)=>{
        try{
            const res = await acceptInvite({auth:userInfo.token,invite:id})
            console.log(res)
            getProjectInvites();
            const res2 = await getAvailibleProjects({auth:userInfo.token,status:'all'})
            setProjects(res2.data.data)
        }catch(err){
            console.log(err)
        }
    }

    const declineProjectInvite = async(id)=>{
        try{
            const res = await declineInvite({auth:userInfo.token,invite:id})
            console.log(res)
            getProjectInvites();
        }catch(err){
            console.log(err)
        }
    }

 


    useEffect(()=>{
        getProjectInvites();
    },[getProjectInvites])


    
    return (
        <div className='ProjectsContainer' style={show?{}:{display:'none',top:"-100vh"}}>
            <div className='ProjectsContentContainer'>
                <div className='ProjectInvites'>
                    <div style={{fontSize:'36px',height:'10%',display:'flex',justifyContent:'center',alignItems:'center'}}>Project Invites</div>
                    {invites.length === 0 ? (
                        <div style={{width:'90%', height:"80%", display:"flex", justifyContent:"center", color:"#7A7A7A"}}>No invitations yet</div>
                    ) : (
                        <div className='ProjectInvitesContainer'>
                            {invites.map(invite=>(
                            <div className='ProjectLinkContainer' key={invite.pk}>
                                <div className='ProjectLinkLeft'>
                                    <div style={{fontSize:'36px',paddingLeft:'20px'}}>{invite.project}</div>
                                </div>
                                <div className='ProjectLinkRight'>
                                    <img style={{height:'40px', paddingRight:'20px', cursor:'pointer'}} onClick={()=>acceptProjectInvite(invite.pk)} src={ok} alt="" />
                                    <img style={{height:'40px', paddingRight:'20px', cursor:'pointer'}} onClick={()=>declineProjectInvite(invite.pk)} src={cancel} alt="" />
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='CreateProjectForm'>
                <div style={{fontSize:'36px',height:'10%',display:'flex',justifyContent:'center',alignItems:'center'}}>Create Project</div>
                    <form className='CreateProjectContainer' onSubmit={submitHandler}>
                        <div className='CenterMainContainer'>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setName(e.target.value)}/>
                                <span className={name.length>0 ? "floating label dirty" : "floating label"} >Project Name</span>
                            </div>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setStatus(e.target.value)}/>
                                <span className={status.length>0 ? "floating label dirty" : "floating label"} >Status</span>
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
            <ToastContainer theme="dark" />
        </div>
    )
}

export default CreateProjects
