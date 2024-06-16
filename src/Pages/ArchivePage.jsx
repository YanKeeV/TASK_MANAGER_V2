import React, { useState,useCallback, useEffect } from 'react'
import './ArchivePage.css'
import Header from './Components/MainPageComponents/Header';
import ArchivePageItem from './Components/ArchivePageComponents/ArchivePageItem';
import { useGetArchivedProjectsMutation, useGetAvailibleProjectsMutation } from '../slices/usersApiSlice';
import { useSelector } from 'react-redux';

function ArchivePage({}) {

    const [getArchivedProjects] = useGetArchivedProjectsMutation();

    const [projects,setProjects] = useState([]);

    const { userInfo } = useSelector((state) => state.auth);

    const  getProjects= useCallback( async() =>{
        try{
        const res = await getArchivedProjects({auth: userInfo.token});
        console.log(projects)
        setProjects(res.data.data)
        }catch(err){
            console.log(err)
        }
    },[getArchivedProjects,setProjects])

    useEffect(()=>{
        getProjects();
    },[])
   

    return (
        <div className='GlobalArchivePageContainer'>
            <Header activeTab={'Archive'}/>
            <div className='ArchivePageContainer'>
                <div className='ArchivePageWrapper' >
                    <h1>Projects archive</h1>
                    <div className='AchiveContainer'>
                        {projects.map((project)=>(
                            <ArchivePageItem key={project.id} project={project}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchivePage
