import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import './index.css'
import store from './store';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage.jsx'
import ProjectPage from './Pages/ProjectPage.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import Team from './Pages/Team.jsx';
import ArchivePage from './Pages/archivePage.jsx';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='/login' element={<LoginPage/> } />
    <Route index={true} path='/' element={<MainPage/>} />
    <Route path='/project/:id' element={<ProjectPage/>} />
    <Route path='/team/:id' element={<Team/>} />
    <Route path='/profile' element={<UserProfile/>} />
    <Route path='/archive' element={<ArchivePage/>} />
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>,
)
