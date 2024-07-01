import React, { useContext, useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Context} from "../main.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios'

const NavBar = () => {
  const[show,setShow]=useState(false)
  const {isAuthenticated,setIsAuthenticated }=useContext(Context)
  const navigateto=useNavigate()
  const handleLogout=async()=>{
      await axios.get("http://localhost:8000/api/v1/user/patient/logout",{
        withCredentials:true
      }).then(res=>{
        toast.success(res.data.message)
        setIsAuthenticated(false)
      }).catch(err=>{
        toast.error(err.response.data.message)
      })
  }
  const gotoLogin=async()=>{
    navigateto("/login")
  }
  return (
    <nav className="Nav-container">
      <div className="logo">HealthEra</div>
      <div className={show?"navLinks showmenu":"navLinks"}>

      <div className="links">
        <Link to={"/"}>HOME</Link>
        <Link to={"/appointment"}>APOINTMENT</Link>
        <Link to={'/about'}>ABOUT US</Link>
        <Link to={'/user-dashboard'}>DASHBOARD</Link>

      </div>
      {isAuthenticated?(
        <button className='logoutBtn btn' onClick={handleLogout}>
          LOGOUT
          </button>
        ):(
          <button className='logoutBtn btn' onClick={gotoLogin}>
          LOGIN
          </button>
          )
        }
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
    </nav>
  )
}

export default NavBar
