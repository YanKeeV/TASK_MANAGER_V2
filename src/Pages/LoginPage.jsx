import React,{useState,useEffect} from 'react'
import LoginForm from './Components/LoginPageComponents/LoginForm'
import RegisterForm from './Components/LoginPageComponents/RegisterForm'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function LoginPage() {
    const [showRegister,setShowRegister]= useState(false)
    const navigate = useNavigate();


    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
        navigate('/');
        }
    }, [navigate, userInfo]);
    return (
        <div className='LoginContainer'>
            <div className='LoginFormContainer' style={showRegister ? {opacity:0,transition:'opacity 1s'} : {opacity:1, transition:'opacity 1.5s'}}>
                <LoginForm registerHandler={setShowRegister} className='LoginForm'/>
            </div>
            <div className='RegisterFormContainer' style={showRegister ? {opacity:1,top:'5%',transition:'top 1.5s'} : {top:'100%',transition:'top 1s'}}>
                <RegisterForm registerHandler={setShowRegister} className='RegisterForm'/>
            </div>
        </div>
    )
}

export default LoginPage
