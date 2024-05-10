import React, { useState,useCallback } from 'react'
import './Comment.css'
import { useSelector } from 'react-redux';
import { useDeleteTaskCommentMutation } from '../../../../slices/usersApiSlice';
import cancel_png from '../../Images/cancel.png';

function Comment({comment,deleteUserComment}) {


    const { userInfo } = useSelector((state) => state.auth);

    const [deleteComment] = useDeleteTaskCommentMutation(); 

    const deleteTaskComment = useCallback(async()=>{
        try{
            deleteUserComment(comment.pk)
            const res = await deleteComment({auth:userInfo.token, comment:comment.pk})
        }catch(err){
            console.log(err)
        }
    },[deleteComment])

    return (
    <div className='GeneralCommentContainer'> 
        <div className='CommentHead'>
            <div>
                <p style={{fontSize:'32px'}}>@{comment.user_tag} 
                <span style={{fontSize:'22px',color:"#ADADAD", marginLeft:"10px"}}>{new Date(comment.created_at).toLocaleDateString("en-GB")}
                </span>
                </p>
            </div>
            <img style={{width:'30px',height:'30px',cursor:'pointer'}}
            src={cancel_png}
            onClick={()=>deleteTaskComment()} />
        </div>
        <p style={{fontSize:'28px',wordWrap:'break-word'}}>{comment.text}</p>
    </div>
    )
}

export default Comment
