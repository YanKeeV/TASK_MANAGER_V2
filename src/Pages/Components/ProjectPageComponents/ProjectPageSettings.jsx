import React, { useState,useCallback } from 'react'
import './ProjectPageSettings.css'
import { useUpdateProjectMutation,useDeleteProjectMutation, useFinishProjectMutation } from '../../../slices/usersApiSlice';
import { setProject } from '../../../slices/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './LocalComponents/ConfirmationModal';

function ProjectPageSettings({setCurrentTab}) {

    const [name,setName]=useState('')
    const [status,setStatus]=useState('')
    const [description,setDescription]=useState('')

    const [modalDeleteActive,setModalDeleteActive]=useState(false)
    const [modalFinishActive,setModalFinishActive]=useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const [finishProject] = useFinishProjectMutation();


    const { userInfo } = useSelector((state) => state.auth);
    const { projectInfo } = useSelector((state) => state.project);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProject({project:projectInfo.id,name:name,description:description, status:status, auth:userInfo.token });
            dispatch(setProject(res.data.data[0]))
            navigate('/')
        } catch (err) {
            toast.error("You do not have permission to perform this action.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            console.log(err)
        }
    };


    const deleteCurrentProject  = async() =>{
        try{
            const res = await deleteProject({project:projectInfo.id, auth:userInfo.token});
            try{
                if(res.error.status === 403)
                {
                    toast.error("You do not have permission to perform this action.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }); 
                    setModalDeleteActive(false);
                }
            }catch{
                navigate('/');
            }
        }catch(err){
            console.log(err)
        }   
    }

    const finishCurrentProject  = async() =>{
        try{
            const res = await finishProject({project:projectInfo.id, auth:userInfo.token}); 
            try{
                if(res.error.status === 403)
                {
                    toast.error("You do not have permission to perform this action.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    }); 
                    setModalFinishActive(false);
                }
            }catch{
                navigate('/');
            }
        }catch(err){
            console.log(err)
        }   
    }

    return (
        <form className='ProjectSettingsWrapper' onSubmit={submitHandler} onClick={(e)=>e.stopPropagation()}>
            <div className='SettingsContainerWrapper'>
                <div className='SettingsContainer'>
                    <div className='gridSettingsItem'>
                        <p style={{fontSize:'32px',margin:"10px 0px 10px 10px"}}>Name</p>
                        <input className='gridInput' onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='gridSettingsItem'>
                        <p style={{fontSize:'32px',margin:"10px 0px 10px 10px"}}>Status</p>
                        <input className='gridInput' onChange={(e)=>setStatus(e.target.value)}/>
                    </div>
                </div>
                <div className='gridSettingsTextAreaContainer' >
                        <p style={{fontSize:'32px',margin:"10px 0px 10px 10px"}}>Description</p>
                        <textarea className='gridTextArea' onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className='ButtonsContainer'>
                    <button className='gridButton' type='submit'>Save</button>
                    <div className='gridButton' style={{color:'#00FF66'}} onClick={setModalFinishActive}>Finish Project</div>
                    <div className='gridButton' style={{color:'#FF3E3E'}} onClick={setModalDeleteActive}>Delete Project</div>
                </div>
            </div>
            <ToastContainer theme="dark" />
            <ConfirmationModal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <p style={{fontSize:"36px"}}>Do you really want to delete the project?</p>
                <div className='ConfirmationButtons'>
                    <button className='gridButton' type='button' onClick={() => deleteCurrentProject()}>Yes</button>
                    <button className='gridButton' type='button' style={{marginLeft:"40px"}} onClick={() => setModalDeleteActive(false)}>No</button>
                </div>
            </ConfirmationModal>
            <ConfirmationModal active={modalFinishActive} setActive={setModalFinishActive}>
                <p style={{fontSize:"36px"}}>Do you really want to finish the project?</p>
                <div className='ConfirmationButtons'>
                    <button className='gridButton' type='button' onClick={() => finishCurrentProject()}>Yes</button>
                    <button className='gridButton' type='button' style={{marginLeft:"40px"}} onClick={() => setModalFinishActive(false)}>No</button>
                </div>
            </ConfirmationModal>
        </form>
    )
}

export default ProjectPageSettings
