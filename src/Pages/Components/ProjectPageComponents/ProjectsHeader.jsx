import React from 'react'
import './ProjectsHeader.css'
import { useDispatch, useSelector } from 'react-redux';
function ProjectsHeader({currentTab,setCurrentTab}) {


    const { projectInfo } = useSelector((state) => state.project);

    return (
        <div className='ProjectsHeader'>
            <div className='HeaderLeft'>
                <p>{projectInfo.name}</p>
                <div className='CentralContainer'>
                    <p>{projectInfo.status}</p>
                </div>
                <p style={currentTab =='Main' ? {borderBottom:'3px solid #00FF66', cursor:"pointer"}:{cursor:"pointer"}}  onClick={()=>setCurrentTab('Main')}>Main</p>
                <p style={currentTab == 'Team' ? {marginLeft:'30px', borderBottom:'5px solid #00FF66', cursor:"pointer"}:{marginLeft:'30px', cursor:"pointer"}} onClick={()=>setCurrentTab('Team')}>Team</p>
                <p style={currentTab == 'Tasks' ? {marginLeft:'30px', borderBottom:'5px solid #00FF66', cursor:"pointer"}:{marginLeft:'30px', cursor:"pointer"}} onClick={()=>setCurrentTab('Tasks')}>Tasks</p>
                <p style={currentTab == 'Settings' ? {marginLeft:'30px', borderBottom:'5px solid #00FF66', cursor:"pointer"}:{marginLeft:'30px', cursor:"pointer"}} onClick={()=>setCurrentTab('Settings')}>Settings</p>
            </div>
        </div>
    )
}

export default ProjectsHeader
