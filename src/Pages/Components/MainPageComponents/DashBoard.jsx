import React, { useState,useEffect,useCallback } from 'react'
import './DashBoard.css'
import { useSelector } from 'react-redux';
import { useGetAvailibleProjectsMutation } from '../../../slices/usersApiSlice';
import project_managment from '../Images/project.png';

function DashBoard() {

    const [latestProjects, setLatestProjects] = useState([]);


    const { userInfo } = useSelector((state) => state.auth);

    const [getAvailibleProjects] = useGetAvailibleProjectsMutation();


    const  getProjects= useCallback( async() =>{
        const res = await getAvailibleProjects({auth: userInfo.token, status:'all'});
        let c = []
        let i=0;
        res.data.data.forEach(project => {
            if(i<res.data.data.length && i<4){
                c.push(project)
            }
            i++;
        });
        console.log(res)
        setLatestProjects(c)
    },[getAvailibleProjects,setLatestProjects])

    useEffect(()=>{
        getProjects();
       },[getProjects])


    return (
        <div className='DashBoardContentContainer'>
            <div style={{height:'10%',width:'100%', display:'flex', justifyContent:'center',alignItems:'center'}}>
                <div style={{fontSize:"40px", width:'86%'}}>
                Welcome, User
                </div>
            </div>
            
            <div className='UpperContent' style={{height:'30%'}}>
            {latestProjects.map(project => (
                <div className='DashboardProjectContainer' key={project.id}>
                    <img className='DashboardProjectImage' src={project_managment} />
                    <div className='ProjectText'>
                        <span style={{fontSize:'40px'}}>{project.name}</span> <br />
                        <span style={{fontSize:'32px'}}>Tasks 15</span>
                    </div>
                </div>
            ))}
            </div>
            <div className='LowerContent'>
                <div className='LowerContentContainer'>
                    <div className='TaskContainer'>
                        <div style={{marginBottom:'15px'}}>Task for today</div>
                        <div className='TodayTaskContainer'>
                            <div className='TodayTaskContainerInnerWrapper'>
                                {/* MAP HERE */}
                                <div className='ActualTodayTaskContainer'>
                                    <div className='TodayTask'>
                                        <div>Task One</div> 
                                        <div >
                                            {/* <div style={{color:'#000000'}}><img style={{width:'40px',height:'40px'}} src='https://cdn.discordapp.com/attachments/1014171486329778219/1153406446973755483/image.png'/> Designers</div> 
                                            <div style={{color:'#000000'}}><img style={{width:'40px',height:'40px'}} src='https://cdn.discordapp.com/attachments/1014171486329778219/1153406774435655680/image.png'/> High</div>  */}
                                        </div>
                                        <div className='TodayTaskTimeContainer'>2 days left</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='TimePartlineContainer'>
                        <div style={{marginBottom:'15px'}}>Timeline</div>
                        <div className='TimelineContainer'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
