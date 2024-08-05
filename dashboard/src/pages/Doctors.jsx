import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main.jsx"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const { isAuthenticated } = useContext(Context)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-deployement-hms.onrender.com/api/v1/user/doctors",
           { withCredentials: true }
          )
          setDoctors(data.doctors)

      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchDoctors()
  })
  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }
  return (
    <section className='page doctors'>
        <h1>Doctors</h1>
      <div className="banner">
        {
          doctors && doctors.length>0 ? (doctors.map(element=>{
            return(
              <div className="card">
                <img src={element.docAvatar && element.docAvatar.url} alt="Doctor Avatar" />
                <h4>{`${element.firstname} ${element.lastname}`}</h4>
                <div className="details">
                  <p>Email: <span>{element.email}</span></p>
                  <p>Phone: <span>{element.phone}</span></p>
                  <p>Dob: <span>{element.dob.substring(0,10)}</span></p>
                  <p>Department: <span>{element.doctorDepartment}</span></p>
                  <p>Gender: <span>{element.gender}</span></p>

                </div>
              </div>
            )
          })):<h1>No Doctors Found</h1>
        }
      </div>

    </section>
  )
}

export default Doctors
