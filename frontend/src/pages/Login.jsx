import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate ,Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const Login=()=> {
  const {isAuthenticated,setIsAuthenticated}=useContext(Context);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const navigateTo=useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      await axios.post(
        "https://backend-deployement-hms.onrender.com/api/v1/user/login",
        { email, password, confirmPassword, role: "Patient" },
        {
        withCredentials:true,
        headers:{'Content-Type':"application/json"}
      }).then((res)=>{
        toast.success(res.data.message)
        setIsAuthenticated(true)
        navigateTo("/")
        setEmail("");
          setPassword("");
          setConfirmPassword("");
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }
  return (
    <>
      <div className=" message-container login">
        <h3>Login</h3>
        <p>Login to continue to Dashboard</p>
        <p>Eius porro enim, earum maiores maxime blanditiis debitis quae beatae iste? Odit saepe a sed. Dicta!</p>
        <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>setConfirmPassword(e.target.value)}
            />
            <div className='r-link'>
              <p>Not Registered? </p>
              <Link to={"/register"}>Register Now</Link>
            </div>
            <button type="submit" className="Submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
