import React, { useState } from 'react'
import ProjectPageMain from './Components/ProjectPageComponents/ProjectPageMain';
import ProjectPageSettings from './Components/ProjectPageComponents/ProjectPageSettings';
import ProjectPageTeam from './Components/ProjectPageComponents/ProjectPageTeam';
import ProjectsHeader from './Components/ProjectPageComponents/ProjectsHeader';
import './ProjectPage.css'
import Header from './Components/MainPageComponents/Header';
import ProjectPageTasks from './Components/ProjectPageComponents/ProjectPageTasks';

function ProjectPage({}) {

    const [currentTab,setCurrentTab] = useState('Main') ;




    return (
        <div className='GlobalProjectPageContainer'>
            <Header />
            <div className='ProjectPageContainer'>
                <div className='ProjectPageWrapper'>
                    <ProjectsHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
                {currentTab == 'Main' ? <ProjectPageMain/> :null}
                {currentTab == 'Team' ? <ProjectPageTeam/> :null}
                {currentTab == 'Tasks' ? <ProjectPageTasks/> : null}
                {currentTab == 'Settings' ? <ProjectPageSettings/> : null}
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
