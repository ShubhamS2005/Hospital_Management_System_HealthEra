import { useContext, useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Appointment from "./pages/Appointment.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Update from "./components/Update.jsx"
import AppointmentDelete from "./components/AppoitnmentDelete.jsx"
import AddDetails from './components/AddDetails.jsx'


import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar.jsx'
import { Context } from './main.jsx'
import axios from 'axios'
import  Footer from "./components/footer.jsx"
function App() {
  const {isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/user-dashboard' element={isAuthenticated ? (<Dashboard/>): (<Navigate to="/login" />)}/>
          <Route path='/update-patient' element={<Update/>}/>
          <Route path='/appointment-status' element={<AppointmentDelete/>}/>
          <Route path='/add-health-details' element={<AddDetails/>}/>



      </Routes>
      <Footer/>
      <ToastContainer position='top-center'/>
    </Router>
    </>
  )
}

export default App
