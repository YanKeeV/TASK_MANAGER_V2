import React, { useCallback, useEffect, useState } from 'react'
import './ProjectPageTeam.css'
import { useGetUsersInProjectMutation,useGetUserPermissionsInProjectMutation,useUpdateUserPermissionsMutation, useDeleteUserFromProjectMutation } from '../../../slices/usersApiSlice'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProjectPageTeam({}) {

    const [getUsersInProject] = useGetUsersInProjectMutation();
    const [getUserPermissions] = useGetUserPermissionsInProjectMutation();
    const [updatePermissions] = useUpdateUserPermissionsMutation();
    const [removeUser] = useDeleteUserFromProjectMutation();

    const [users,setUsers] = useState([]);

    const [permissions,setPermissions] = useState('')
    
    const [currentUser,setCurrentUser] = useState('');

    const { userInfo } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.project);

    const permissionsHandler = async(name,value) =>{
        try{
            if(permissions.user === undefined){
                toast.error("Select a user", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                }); 
                return;
            }
            let res = await updatePermissions({auth:userInfo.token,project:projectInfo.id,user:permissions.user,permission:name})
            setPermissions({...permissions,[name]:value})
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }

    const getUsers = useCallback(async() =>{
        try{
            let res = await getUsersInProject({auth:userInfo.token,project:projectInfo.id})
            setUsers(res.data)
        }catch(err){
            console.log(err)
        }
    },[getUsersInProject,setUsers])

    const getUserCertainPermissions = useCallback(async(email)=>{
        try{
            let res = await getUserPermissions({project:projectInfo.id, user:email, auth:userInfo.token})
            setPermissions(res.data.data[0])
            setCurrentUser(email);
            console.log(res.data.data[0])
        }catch(err){
            console.log(err)
        } 
    },[setPermissions,getUserPermissions])
    
    
    const removeUserFromProject = async() =>{
        try{
            if(currentUser === ''){
                toast.error("Select a user", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                }); 
                return;
            }
            let user = users.filter(user=>user.email==currentUser)
            let res = await removeUser({auth:userInfo.token,user:user[0].id,project:projectInfo.id })

            if(res.error.status === 403)
            {
                toast.error("You do not have permission to perform this action", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                }); 
            }

            console.log(res);
        }catch(err){
            toast.success("User has been successfully removed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });  
            getUsers()
            console.log(err)
        }
    }

    useEffect(()=>{
        getUsers()
    },[getUsers])

    return (
        <div className='ProjectTeamWrapper'>
            
            <div className='PermissionsContainer'>
                <div className='gridItem' style={{border:'none',position:"relative",padding:'0px'}}>
                <select className='GridTeamSelect' onChange={(e)=>getUserCertainPermissions(e.target.value)}>
                    <option hidden>Select a user</option>
                    {users.map((user)=>(
                        <option key={user.id}>{user.email}</option>
                    ))}                    
                </select>
                <div className='arrowDropDown'/>
                </div>
                <div className='gridItem' style={{color:"#FF3E3E", border:'3px solid #FF3E3E'}}>
                    <div className='RemoveButton' onClick={()=>removeUserFromProject()}>Remove user</div>
                </div>

                <div className='gridItem'>
                    <p>Can invite user</p>
                    <label className="switch">
                        <input type="checkbox" name='can_invite_user' 
                        checked={permissions && permissions.can_invite_user ? true : false } 
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_invite_user)}/>
                        <span className="slider round"/>
                    </label>
                </div>
                <div className='gridItem'>
                    <p>Can kick user</p>
                    <label className="switch">
                        <input type="checkbox" name='can_kick_user' checked={permissions && permissions.can_kick_user ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_kick_user)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can set permissions</p>
                    <label className="switch">
                        <input type="checkbox" name='can_edit_user_permissions' checked={permissions && permissions.can_edit_user_permissions ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_edit_user_permissions)}/>
                        <span className="slider round"/>
                    </label>
                </div>
                
                <div className='gridItem'>
                    <p>Can assign tasks</p>
                    <label className="switch">
                        <input type="checkbox" name='can_set_user_to_task' checked={permissions && permissions.can_set_user_to_task ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_set_user_to_task)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can create tasks</p>
                    <label className="switch">
                        <input type="checkbox" name='can_create_task' checked={permissions && permissions.can_create_task ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_create_task)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can delete tasks</p>
                    <label className="switch">
                        <input type="checkbox" name='can_delete_task' checked={permissions && permissions.can_delete_task ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_delete_task)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can edit tasks</p>
                    <label className="switch">
                        <input type="checkbox" name='can_edit_task' checked={permissions && permissions.can_edit_task ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_edit_task)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can checkout tasks</p>
                    <label className="switch">
                        <input type="checkbox" name='can_checkout_task' checked={permissions && permissions.can_checkout_task ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_checkout_task)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can delete project</p>
                    <label className="switch">
                        <input type="checkbox" name='can_delete_project' checked={permissions && permissions.can_delete_project ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_delete_project)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can edit project</p>
                    <label className="switch">
                        <input type="checkbox" name='can_edit_project' checked={permissions && permissions.can_edit_project ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_edit_project)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <div className='gridItem'>
                    <p>Can finish project</p>
                    <label className="switch">
                        <input type="checkbox" name='can_finish_project' checked={permissions && permissions.can_finish_project ? true : false }
                        onChange={(e)=>permissionsHandler(e.target.name, !permissions.can_finish_project)}/>
                        <span className="slider round"/>
                    </label>
                </div>

                <ToastContainer theme="dark" />
            </div>
        </div>
    )
}

export default ProjectPageTeam
