import React,{useState,useEffect} from 'react'
import './LoginForm.css'
import { useDispatch } from 'react-redux';
import { useLoginMutation,useGetUserMutation } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { setUser } from '../../../slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router';

const LoginForm = ({registerHandler})=> {
    const [username,setEmail] = useState('') ;
    const [password,setPassword] = useState('') ;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const [getUser] = useGetUserMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(username == "" || password == "")
        {
            toast.error("All inputs shuold be filled", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }
        try {
            console.log('in ' + username + ' in ' + password)
            const res = await login({ username, password });
            console.log(res)
            if(res.data){
                dispatch(setCredentials({ ...res.data }));
                const res2 = await getUser({auth:res.data.token})
                dispatch(setUser({...res2.data.data[0]}))
                console.log('asdqw')
                console.log(res2)
                navigate('/');
            } else{
                toast.error("Invalid login or password", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <form className='LoginForm' onSubmit={submitHandler}>
                <div className='LoginTopContainer'>
                    <div className='FormElementsContainer'>
                        <p className='Naming'>CyberWeb Solutions</p>
                        <div className='InputContainer'>
                            <div className='microInputContainer'>
                                <input className='FormInput' onChange={(e)=>setEmail(e.target.value)}/>
                                <span className={username.length>0 ? "floating label dirty" : "floating label"} >Email</span>
                            </div>
                            <div className='microInputContainer'>
                                <input className='FormInput' type="password" onChange={(e)=>setPassword(e.target.value)} />
                                <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
                            </div>
                        </div>
                        <button className='LoginButton' type='submit'>Login</button>
                    </div>
                </div>
                <div className='LoginBottomContainer' onClick={()=>registerHandler(true)}>
                    Register
                </div>
                <ToastContainer theme="dark" />
        </form>
    )
}

export default LoginForm
