import React,{useState,useEffect} from 'react'
import './RegisterForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation,useLoginMutation, useGetUserMutation, useGetAvailibleProjectsMutation, useGetAvailibleTeamsMutation } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm({registerHandler}) {
    const [name,setName] = useState('') ;
    const [surname,setSurname] = useState('') ;
    const [tag,setTag] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [email,setEmail] = useState('') ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register] = useRegisterMutation();
    const [login] = useLoginMutation();
    const [getUser] = useGetUserMutation();
    const { userInfo } = useSelector((state) => state.auth);


    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
      }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(name == "" || surname == "" || tag == "" || password == "" || email == ""){
          toast.error("All inputs shuold be filled", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          return;
        }
          try {
            console.log('in')
            const res = await register({email:email, first_name:name, last_name:surname, password:password, tag:tag });
            
            const res2 = await login({username:email,password:password})
            console.log(res2)
            console.log("res2")
            dispatch(setCredentials({ ...res2.data }));
            
            const res3 = await getUser({auth:res2.data.token})
            console.log(res3)
            console.log("res3")
            dispatch(setUser({...res3.data.data[0]}))

            navigate('/');
          } catch (err) {
              console.log(err)
          }
      };


    return (
        <form className='RegisterForm' onSubmit={submitHandler}>
            <div className='RegisterFormTopContainer'>
                <div className='RegisterFormElementsContainer'>
                        <p className='Naming'>Register</p>
                        <div className='RegisterInputContainer'>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setName(e.target.value)} />
                            <span className={name.length>0 ? "floating label dirty" : "floating label"} >Name</span>
                          </div>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setSurname(e.target.value)} />
                            <span className={surname.length>0 ? "floating label dirty" : "floating label"} >Surname</span>
                          </div>
                          <div className='microInputContainer'>
                            <input className='FormInput' onChange={(e)=>setTag(e.target.value)} />
                            <span className={tag.length>0 ? "floating label dirty" : "floating label"} >Tag</span>
                          </div>
                          <div className='microInputContainer'>
                            <input className='FormInput' type="password" onChange={(e)=>setPassword(e.target.value)} />
                            <span className={password.length>0 ? "floating label dirty" : "floating label"} >Password</span>
                          </div>  
                          <div className='microInputContainer'>
                            <input className='FormInput' type="email" onChange={(e)=>setEmail(e.target.value)} />
                            <span className={email.length>0 ? "floating label dirty" : "floating label"} >Email</span>
                          </div>
                        </div>
                        <button className='LoginButton'>Register</button>
                </div>
            </div>
            <div className='RegisterFormBottomContainer' onClick={()=>registerHandler(false)}>
                Return
            </div>
            <ToastContainer theme="dark" />
        </form>
    )
}

export default RegisterForm
