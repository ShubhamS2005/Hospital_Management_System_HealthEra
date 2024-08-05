import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../main.jsx"
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { GoCheckCircleFill } from "react-icons/go"
import { AiFillCloseCircle } from "react-icons/ai"
import { toast } from 'react-toastify'
const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context)
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-deployement-hms.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        )
        setAppointments(data.appointments)

      } catch (error) {
        setAppointments([])
        console.log("Some Error occured:", error)
      }
    }
    fetchAppointments()
  }, [])
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
  const handleUpdateStatus = async (appointmentid, status) => {
    try {
      const { data } = await axios.put(`https://backend-deployement-hms.onrender.com/api/v1/appointment/update/${appointmentid}`
        , { status }
        , { withCredentials: true }
      )
      // here old data is not disturbed but new is added
      setAppointments(prevAppointemnts =>
        prevAppointemnts.map(appointment =>
          appointment._id === appointmentid
            ? { ...appointment, status }
            : appointment
        )
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }
  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="b-container">
          <div className="firstBox">
            <div className='fb-img'>
            <img src="/docHolder.jpg" alt="docimg" />
            </div>
            <div className='content'>
              <p>Hello</p>
              <h4>
                {
                  user && `${user.firstname} ${user.lastname}`
                }
              </h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt fuga totam magni exercitationem.
                </p>
            </div>
          </div>
          <div className="secondBox">
            <h3>Total Appointments</h3>
            <span>{appointments.length}</span>
          </div>
          <div className="thirdBox">
            <h3>Registered Doctors</h3>
            <span>{doctors.length}</span>
          </div>
        </div>
      </div>


        <div className="banner">
          <h3>Appointments</h3>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {
                appointments && appointments.length > 0 ? (
                  appointments.map(appointment => {
                    return (
                      <tr key={appointment._id}>
                        <td>{`${appointment.firstname} ${appointment.lastname}`}</td>
                        <td>{appointment.appointmentDate.substring(0, 10)}</td>
                        <td>{`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}</td>
                        <td>
                          {appointment.department}
                        </td>
                        <td>
                          <select
                            name="status"
                            id="status"
                            className={
                              appointment.status === "Pending"
                                ? "value-pending"
                                : appointment.status === "Rejected"
                                  ? "value-rejected"
                                  : "value-accepted"
                            }
                            value={appointment.status}
                            onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                          >
                            <option value="Pending" className="value-pending">Pending</option>
                            <option value="Rejected" className="value-rejected">Rejected</option>
                            <option value="Accepted" className="value-accepted">Accepted </option>

                          </select>
                        </td>
                        <td>
                          {appointment.hasVisited === true ? <GoCheckCircleFill className='green' /> : <AiFillCloseCircle className='red' />}
                        </td>
                      </tr>
                    )
                  })) :
                  (<tr>
                    <td>
                      No Appointments
                    </td>
                  </tr>)
              }
            </tbody>
          </table>
        </div>
    </section>
  )
}

export default Dashboard
