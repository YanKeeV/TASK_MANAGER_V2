import React, { useState } from 'react'
import './UserProfile.css'
import { useNavigate } from 'react-router-dom';
import { useGetUserMutation, useUpdateUserProfileMutation, useChangePasswordMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import Header from './Components/MainPageComponents/Header';
import { useEffect } from 'react';
import { setUser } from '../slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './Components/ProjectPageComponents/LocalComponents/ConfirmationModal';

function UserProfile() {

    const [name,setName] = useState('') ;
    const [surname,setSurname] = useState('') ;
    const [email,setEmail] = useState('');
    const [status,setStatus] = useState('');
    const [tag,setTag] = useState('');
    const [role,setRole] = useState('');

    const [newPassword,setNewPassword]=useState('');
    const [oldPassword,setOldPassword]=useState('');

    const [modalPasswordActive,setModalPasswordActive]=useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { certainUserInfo } = useSelector((state) => state.certainUser);

    const [updateUser] = useUpdateUserProfileMutation();
    const [getUser] = useGetUserMutation();
    const [changePasswordReq] = useChangePasswordMutation();

    const getCurrentUser = async()=>{
        try{
            const res = await getUser({auth:userInfo.token})
            dispatch(setUser({...res.data.data[0],password:''}))
        }catch(err){
            console.log(err)
        }
    }

    const changePassword = async()=>{
        try{
            const res = await changePasswordReq({auth:userInfo.token, old_password:oldPassword, new_password:newPassword})
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await updateUser({email:email,first_name:name,last_name:surname, status:status, auth:userInfo.token, tag:tag,role:role });
            console.log(res)
            dispatch(setCredentials({email:res.data.data[0].email,token:userInfo.token,user_id:userInfo.user_id}))
            getCurrentUser();
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className='GlobalProfileContainer'>
            <Header activeTab={'Profile'}/>
            <div className='ProfileContainer'>
                <form className='ProfileContentContainer' onSubmit={submitHandler}>
                    <div className='TopFormPart'>
                        <div  className='TopFormUserInfo'>
                            <img className='Avatar' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/White_Square.svg/1200px-White_Square.svg.png'/>
                            <div style={{marginLeft:"15px"}}>
                                {certainUserInfo.first_name + ' ' + certainUserInfo.last_name} <br/>
                                <span style={{fontSize:'32px'}}>@{certainUserInfo.tag}</span>
                            </div>
                        </div>
                        <div className='TopFormActions'>
                            <button className='UserFormButton' type='button' onClick={setModalPasswordActive}>Change Password</button>
                            <button className='UserFormButton' type='submit'>Save</button>
                        </div>
                    </div>
                    <div className='BottomFormPart'>
                        <div className='BottomFormGridItem'>
                            <div style={{marginTop:'20px'}}>Name</div>
                            <input className='ProfileFormInput' placeholder={certainUserInfo.first_name} onChange={(e)=>setName(e.target.value)}></input>
                        </div>
                        <div className='BottomFormGridItem'>
                            <div style={{marginTop:'20px'}} >Surname</div>
                            <input className='ProfileFormInput' placeholder={certainUserInfo.last_name} onChange={(e)=>setSurname(e.target.value)}></input>
                        </div>
                        <div className='BottomFormGridItem'>
                            <div style={{marginTop:'20px'}} >Email</div>
                            <input className='ProfileFormInput' placeholder={certainUserInfo.email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div className='BottomFormGridItem'>
                            <div style={{marginTop:'20px'}} >Status</div>
                            <input className='ProfileFormInput' placeholder={certainUserInfo.status} onChange={(e)=>setStatus(e.target.value)}></input>
                        </div>
                        <div className='BottomFormGridItem'>
                            <div style={{marginTop:'20px'}} >Tag</div>
                            <input className='ProfileFormInput' placeholder={certainUserInfo.tag} onChange={(e)=>setTag(e.target.value)}></input>
                        </div>
                        <div className='BottomFormGridItem'>
                            <div style={{marginTop:'20px'}} >Role</div>
                            <input className='ProfileFormInput' placeholder={certainUserInfo.role} onChange={(e)=>setRole(e.target.value)}></input>
                        </div>
                    </div>
                </form>
                <ConfirmationModal active={modalPasswordActive} setActive={setModalPasswordActive} customWidth={"40vw"}>
                    <p style={{fontSize:"36px"}}>Change password</p>
                    <div className='microInputContainer' style={{marginTop:"20px"}}>
                        <input className='FormInput' type='password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                        <span className={oldPassword.length>0 ? "floating label dirty" : "floating label"} >Old password</span>
                    </div>
                    <div className='microInputContainer' style={{marginTop:"20px"}}>
                        <input className='FormInput' type='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        <span className={newPassword.length>0 ? "floating label dirty" : "floating label"} >New password</span>
                    </div>
                    <button className='gridButton' type='button' style={{marginTop:"20px"}} onClick={() => changePassword()}>Save</button>
                </ConfirmationModal>
                <ToastContainer theme="dark" />
            </div>
        </div>
    )
}

export default UserProfile
