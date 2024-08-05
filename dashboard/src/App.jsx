import React, { useContext ,useEffect} from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard.jsx"
import AddNewAdmin from "./pages/AddNewAdmin.jsx"
import AddNewDoctor from "./pages/AddNewDoctor.jsx"
import Doctors from "./pages/Doctors.jsx"
import Login from "./pages/Login.jsx"
import Messages from "./pages/Messages.jsx"
import Sidebar from "./pages/Sidebar.jsx"
import BedStatus from "./pages/BedStatus.jsx"
import BedAdd from "./pages/BedAdd.jsx"
import BedUpdate from "./pages/BedUpdate.jsx"
import AdmitPatient from "./pages/AdmitPatient.jsx"
import UpdatePatient from "./pages/UpdatePatient.jsx"
import DischargePapers from "./pages/DishchargePapers.jsx"
import DownloadPapers from "./pages/DownloadPapers.jsx"





import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main.jsx'
import axios from "axios"
import './App.css'

const App = () => {
  const{isAuthenticated,setIsAuthenticated,setUser}=useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://backend-deployement-hms.onrender.com/api/v1/user/admin/me",
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
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
      <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
      <Route path='/messages' element={<Messages/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/bed' element={<BedStatus/>}/>
      <Route path='/add-bed' element={<BedAdd/>}/>
      <Route path='/update-bed' element={<BedUpdate/>}/>
      <Route path='/admit-patient' element={<AdmitPatient/>}/>
      <Route path='/update-patient' element={<UpdatePatient/>}/>
      <Route path='/discharge-papers' element={<DischargePapers/>}/>
      <Route path='/download-papers' element={<DownloadPapers/>}/>



    </Routes>
   <ToastContainer position='top-center'/>
   </Router>

   </>
  )
}

export default App
