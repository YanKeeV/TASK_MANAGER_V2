import React, { useState,useEffect,useCallback } from 'react'
import './MainPage.css'
import Header from './Components/MainPageComponents/Header'
import DashBoard from './Components/MainPageComponents/DashBoard';
import CreateProjects from './Components/MainPageComponents/CreateProjects';
import Teams from './Components/MainPageComponents/Teams';
import UserProfile from './UserProfile';
import Files from './Components/MainPageComponents/Files';
import Team from './Team';
import ProjectPage from './ProjectPage';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function MainPage() {

    const navigate = useNavigate();


    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
        navigate('/login');
        }

    }, [navigate, userInfo]);


    return (
        <div className='MainPageContainer'>
            <Header activeTab={'Dashboard'}/>
            <DashBoard/>
        </div>
    )
}

export default MainPage
