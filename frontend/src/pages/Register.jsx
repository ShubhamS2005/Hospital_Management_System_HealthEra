import React, { useContext, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { Navigate,useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const NavigateTo=useNavigate()



  const registerhandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        "http://localhost:8000/api/v1/user/register",
        { firstname, lastname, email, password, phone, dob, gender,role:"Patient"},
        {
          withCredentials: true,
          headers: "Content-Type:application/json"
        }).then((res)=>{
          toast.success(res.data.message)
          NavigateTo("/login")
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
      <div className=" message-container">
        <h3>Register</h3>
        <form onSubmit={registerhandler}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='date'
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e)=>setGender(e.target.value) }>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='r-link'>
              <p>Already Registered? </p>
              <Link to={"/login"}>Login Now</Link>
            </div>
          <button type="submit" className="Submit">Register </button>
        </form>
      </div>
    </>
  )
}

export default Register
