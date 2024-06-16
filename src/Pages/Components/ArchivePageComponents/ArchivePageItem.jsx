import React, { useState, useCallback, useEffect } from 'react'
import './ArchivePageItem.css'
import { useGetProjectArchiveUsersMutation } from '../../../slices/usersApiSlice'
import { useSelector } from 'react-redux';
import user_png from '../Images/user.png'

function ArchivePageItem({project}) {

    const [users,setUsers] = useState([]);
    
    const { userInfo } = useSelector((state) => state.auth);

    const [getUsersInProject] = useGetProjectArchiveUsersMutation();

    const getUsers = useCallback(async() =>{
        try{
            let res = await getUsersInProject({auth:userInfo.token, project:project.id})
            setUsers(res.data.data)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    },[getUsersInProject,setUsers])

    useEffect(()=>{
        getUsers()
    },[getUsers])

    const handleClick =()=> {
        console.log(users)
    }

    return (
        <div className='ArchiveItemContainer'>
            <div className='archiveLeftSide'>
                <p style={{fontSize:'48px', maxWidth:'97%'}}>{project.name}</p>
                <div className='Description'>{project.description}</div>
            </div>
            <div className='archiveRightSide'>
                <div className='usersImages'>
                    {users.slice(0,8).map(user=>(
                        <img key={user.id} className='archiveUserImage' src={user.image ?? user_png} />
                    ))}
                </div>
                <p className='CompletedIn'>Completed in:{(Math.ceil((Date.parse(project.finished_at)-Date.parse(project.start_date))/(1000*60*60*24)))} days</p>
            </div>    
        </div>
    )
}

export default ArchivePageItem
