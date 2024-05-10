import React, { useState,useCallback,useEffect } from 'react'
import './ProjectPageMain.css'
import { useInviteUserMutation,useGetProjectTasksMutation } from '../../../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function ProjectPageMain() {

    const { userInfo } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.project);

    const [userEmail,setUserEmail] = useState('');

    const [inviteUser] = useInviteUserMutation();
    const [getProjectTasks] = useGetProjectTasksMutation();

    const addUserToProject = async() =>{
        try{
            const res = await inviteUser({auth:userInfo.token, user_get:userEmail,message:'',project:projectInfo.id})  
            console.log(res.error)
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

    const [newTasks,setNewTasks]=useState([]);
    const [progressTasks,setProgressTasks]=useState([]);
    const [checkoutTasks,setCheckoutTasks]=useState([]);
    const [endedTasks,setEndedTasks]=useState([]);



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

    const showInviteMessage = () => {
        toast.success("Success Notification !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    useEffect(()=>{
        getTasks();
    },[getTasks])

    return (
            <div className='ProjectsPageMainContentContainer'> 
                <div className='TTEST' style={{display:'block'}}>
                    <div className='ProjectInformation'>{projectInfo.description}</div>
                    <div className='ProjectDescription'>{Math.ceil((new Date(projectInfo.finish_date).getTime() - new Date(projectInfo.start_date).getTime())/(1000 * 3600 * 24))} days left</div>
                </div>
                <div className='TTEST' style={{justifyContent:'center', padding:'0'}}>
                    <p style={{fontSize:'36px'}}>Invite user</p>
                    <div className='userInviteContainer'>
                        <input style={customInput} placeholder="Search" onChange={(e)=>setUserEmail(e.target.value)}/>
                        <button style={customAddUserPlusSign} onClick={()=>addUserToProject()}>+</button>
                        <ToastContainer theme="dark" />
                    </div>
                </div>
                <div className='TTEST' style={{justifyContent:'center', padding:'0'}}>
                    <div className='InDevTag'>
                        In dev
                    </div>
                    <div className='InDevHint'>
                        *there will be a chat room to communicate about the project
                    </div>
                </div>
                <div className='TTEST'>
                    <div className='TaskStatisticPart'>
                        <p style={{textAlign:'center',fontSize:'36px'}}>Task Statistic</p>
                        <div className='TaskStatistic'>
                            <div className='StatisticItem' style={{color:'#FF7A00'}}>
                                <p>New</p>
                                <div className='line' style={{backgroundColor:'#FF7A00'}}></div>
                                <p>{newTasks.length}</p>
                            </div>

                            <div className='StatisticItem' style={{color:'#FAFF00'}}>
                                <p style={{whiteSpace:'nowrap'}}>In progress</p>
                                <div className='line' style={{backgroundColor:'#FAFF00'}}></div>
                                <p>{progressTasks.length}</p>
                            </div>

                            <div className='StatisticItem' style={{color:'#8DFF34'}}>
                                <p>Checkout</p>
                                <div className='line' style={{backgroundColor:'#8DFF34'}}></div>
                                <p>{checkoutTasks.length}</p>
                            </div>

                            <div className='StatisticItem' style={{color:'#00FF66'}}>
                                <p>Finished</p>
                                <div className='line' style={{backgroundColor:'#00FF66'}}></div>
                                <p>{endedTasks.length}</p>
                            </div>

                            <div className='StatisticItem' style={{color:'white',backgroundColor:'#696969',borderRadius:'20px',padding:'0px 50px'}}>
                                <p>All</p>
                                <div className='line' style={{backgroundColor:'white'}}></div>
                                <p>{newTasks.length+checkoutTasks.length+progressTasks.length+endedTasks.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ProjectPageMain


