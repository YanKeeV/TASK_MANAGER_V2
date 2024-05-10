import React, { useState,useCallback, useEffect, useRef } from 'react'
import './TaskComponent.css'
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useDeleteTaskMutation, useGetCommentsByTaskMutation, useSendCommentMutation, useUpdateTaskStatusMutation } from '../../../../slices/usersApiSlice';
import Comment from './Comment';
import dot_png from '../../Images/dots.png';
import cancel_png from '../../Images/cancel.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';

Modal.setAppElement('#root');

function TaskComponent({task, deleteTask, getTasks}) {

    const [menu,setMenu] = useState(false)
    const [show,setShow] = useState(false)
    const [mode,setMode] = useState('description');

    const [user_comment,setUserComment] = useState('');

    const [comments,setComments] = useState();

    const { userInfo } = useSelector((state) => state.auth);

    const [getAllComments] = useGetCommentsByTaskMutation(); 
    const [sendUserComment] = useSendCommentMutation(); 
    const [deleteCertainTask] = useDeleteTaskMutation();
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const menuRef = useRef(null);

    const [modalDeleteActive,setModalDeleteActive]=useState(false)

    const sendComment = async()=>{
        try{
            const res = await sendUserComment({auth:userInfo.token,task:task.pk,text:user_comment})
            getComments()
        }catch(err){
            console.log(err)
        }
    }

    const getComments = useCallback(async()=>{
        try{
            const res = await getAllComments({auth:userInfo.token,task:task.pk})
            setComments(res.data.data)
            setShow(true)
        }catch(err){
            console.log(err)
        }
    },[getAllComments])

    const deleteProjectTask = useCallback(async()=>{
        try{
            const res = await deleteCertainTask({auth:userInfo.token,task_id:task.pk,project:task.project});
            if(res.error.status === 403){
                toast.error("You do not have permission to perform this action", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                }); 
            }
            console.log(res);
        }catch(err){
            toast.success("User has been successfully removed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            }); 
            deleteTask(task.pk)
            console.log(err)
        }
    },[deleteCertainTask, deleteTask])

    const deleteUserComment=(id)=>{
        let items = comments.filter(comment=>comment.pk!==id)
        setComments(items)
    }

    const toNextCategory = async()=>{
        try{
            let res = null;
            switch (task.status) {
                case 'N':
                    res = await updateTaskStatus({auth:userInfo.token,pk:task.pk,project:task.project,status:"P"});
                    getTasks()
                    break;
                case 'P':
                    res = await updateTaskStatus({auth:userInfo.token,pk:task.pk,project:task.project,status:"C"});
                    getTasks()
                    break;
                case 'C':
                    res = await updateTaskStatus({auth:userInfo.token,pk:task.pk,project:task.project,status:"F"});
                    getTasks()
                    if(res.error.status === 403){
                        toast.error("You do not have permission to perform this action", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        return;
                    }
                    break;
                case 'F':
                    toast.error("Task already finished", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    break;
                default:
                    console.log(task.status);
              }
        }catch(err){
            console.log(err)
        }
    }

    const toPreviousCategory = async()=>{
        try{
            let res = null;
            switch (task.status) {
                case 'N':
                    toast.error("Task already new", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    break;
                case 'P':
                    res = await updateTaskStatus({auth:userInfo.token,pk:task.pk,project:task.project,status:"N"});
                    getTasks()
                    break;
                case 'C':
                    res = await updateTaskStatus({auth:userInfo.token,pk:task.pk,project:task.project,status:"P"});
                    getTasks()
                    break;
                case 'F':
                    res = await updateTaskStatus({auth:userInfo.token,pk:task.pk,project:task.project,status:"C"});
                    getTasks()
                    break;
                default:
                    console.log(task.status);
              }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);


    return (
    <div className='TaskContainerMain'> 
        <p style={{fontSize:'28px'}}>{task.name}</p>
        <div style={{display:"flex",flexDirection:'column'}}>
            <div style={{background:'#696969',width:'auto',display:'inline',textAlign:'center', borderRadius:'10px',padding:'2px 5px',maxWidth:'50%'}}>{task.group}</div>
                <div style={task.priority=="L"?
                {color:'#00FF66',backgroundColor:'rgba(0,255,102,0.45)',display:'inline',borderRadius:'10px',padding:'2px 5px',marginTop:'3px',textAlign:'center',maxWidth:'50%'}
                :task.priority=="M"?{
                color:'#FF7A00',backgroundColor:'rgba(255,122,0,0.45)',display:'inline',borderRadius:'10px',padding:'2px 5px',marginTop:'3px',textAlign:'center',maxWidth:'50%'}
                :task.priority=="H"?
                {color:'#FF3E3E',backgroundColor:'rgba(255,62,62,0.45)',display:'inline',borderRadius:'10px',padding:'2px 5px',marginTop:'3px',textAlign:'center',maxWidth:'50%'}:null}>
                    {task.priority=="L"?"Low":task.priority=="M"?"Medium":task.priority=="H"?"High":null}
                </div>
        </div>
        <p style={{position:'absolute', bottom:'10px'}}>{new Date(task.end_date).toLocaleDateString("en-GB")}</p>
        <p style={{position:'absolute', bottom:'10px', right:'10px'}}>@{task.user_tag}</p>
        <img className='optionsImage' style={menu ? {display:'none'}:null} onClick={()=>setMenu(true)} src={dot_png} />
        <div ref={menuRef} className='options' style={menu?null:{display:'none'}}>
            <div className='optionsPart' style={{borderBottom:'1px solid black',cursor:"pointer"}} onClick={()=>getComments()}>Edit</div>
            <div className='optionsPart' style={{borderBottom:'1px solid black',cursor:"pointer"}} onClick={()=>toNextCategory()}>To next</div>
            <div className='optionsPart' style={{borderBottom:'1px solid black',cursor:"pointer"}} onClick={()=>toPreviousCategory()}>To prev</div>
            <div className='optionsPart' style={{cursor:'pointer'}} onClick={setModalDeleteActive}>Delete</div>
        </div>

        <ConfirmationModal active={modalDeleteActive} setActive={setModalDeleteActive}>
            <p style={{fontSize:"36px"}}>Do you really want to delete the task?</p>
            <div className='ConfirmationButtons'>
                <button className='gridButton' type='button' onClick={() => deleteProjectTask()}>Yes</button>
                <button className='gridButton' type='button' style={{marginLeft:"40px"}} onClick={() => setModalDeleteActive(false)}>No</button>
            </div>
        </ConfirmationModal>

        <Modal
        isOpen={show}
        className="FormModal"
        overlayClassName="Overlay"
        shouldCloseOnOverlayClick={true}
        onRequestClose={()=>setShow(false)}
        >
                <div className='ModalContainer'>
                    <div className='ModalHeader'>
                        <p style={{fontSize:'40px', paddingBottom:'10px'}}>{task.name}</p>
                        <img style={{cursor:'pointer'}} src={cancel_png} className='ModalClose' onClick={()=>setShow(false)}/>
                    </div>

                    <div className='ViewOptionSelector'>
                        <p className='TaskField'>Group:</p>
                        <div className='FieldContainer'>
                            <p className='TaskField'> {task.group}</p>
                        </div>
                    </div>
                    <div className='ViewOptionSelector'>
                        <p className='TaskField'>Deadline:</p>
                        <div className='FieldContainer'>
                            <p className='TaskField'> {new Date(task.end_date).toLocaleDateString("en-GB")}</p>
                        </div>
                    </div>


                    <div className='ViewOptionSelector'>
                        <p className='TaskField'>Executor:</p>
                        <div className='FieldContainer'>
                            <p className='TaskField' style={{width:'500px'}}> {task.user_first_name} {task.user_last_name}</p>
                        </div>
                    </div>


                    <div className='ViewOptionSelector' style={{marginBottom:"5px"}}>
                        <p className='TaskField'>Priority:</p>
                        <div className='FieldContainer' style={{display:"flex", alignItems:"center"}}>
                            <p style={task.priority=="L"?
                                {color:'#00FF66',backgroundColor:'rgba(0,255,102,0.45)',display:'inline',borderRadius:'10px',padding:'2px 5px',marginTop:'3px',textAlign:'center'}
                                :task.priority=="M"?{
                                color:'#FF7A00',backgroundColor:'rgba(255,122,0,0.45)',display:'inline' ,borderRadius:'10px',padding:'2px 5px',marginTop:'3px',textAlign:'center'}
                                :task.priority=="H"?
                                {color:'#FF3E3E',backgroundColor:'rgba(255,62,62,0.45)',display:'inline',borderRadius:'10px',padding:'2px 5px',marginTop:'3px',textAlign:'center'}:null}>
                                    {task.priority=="L"?"Low":task.priority=="M"?"Medium":task.priority=="H"?"High":null}
                            </p>
                        </div>
                    </div>
                    <div style={{width:'100%',borderBottom:'2px solid #464646'}}>
                        <div className='ViewOptionSelector'>
                            <p style={mode=='description'?{borderBottom:"3px solid black",cursor:'pointer'}:{cursor:'pointer'}} 
                            onClick={()=>setMode('description')}>Description</p>
                            <p style={mode=='comments'?{borderBottom:"3px solid black", borderRadius:"3px",cursor:'pointer'}:{cursor:'pointer'}} 
                            onClick={()=>setMode('comments')}>Comments</p>
                        </div>
                    </div>
                    {mode == 'description' ?
                    <div className='ViewOptionSelector description'>
                        {task.description}
                    </div> : 
                    <>
                    <div>
                        <div className='CommentInputContainer'>
                            <input className='ViewOptionSelector comments' name='comment' placeholder='Enter text...' onChange={(e)=>setUserComment(e.target.value)}/>
                            <div className='SendButton' onClick={()=>sendComment()}>Send</div>
                        </div>
                    </div>
                    <div className='CommentsContainer'>
                        {comments.map((comment)=>(
                            <Comment key={comment.pk} comment={comment} deleteUserComment={deleteUserComment}/>
                        ))}
                    </div>
                    </>
                    }

                </div>
        </Modal>
    </div>
    )
}

export default TaskComponent
