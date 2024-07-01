import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import { GoCheckCircleFill } from 'react-icons/go'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify'

const AppoitnmentDelete = () => {
    const { isAuthenticated, User, setUser } = useContext(Context)
    const [appointments, setAppointments] = useState([])
  const navigateto=useNavigate()


    const DeleteAppointment=async(id)=>{
        try {
            await axios.delete(`http://localhost:8000/api/v1/user/delete/${id}`
                ,{withCredentials:true}
            ).then((res)=>{
                toast.success(res.data.message)
                navigateto("/user-dashboard")

            })
        } catch (error) {
            toast.error(error.res.data.message)
        }
    }


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const id = User._id
                await axios.get(
                    `http://localhost:8000/api/v1/appointment/get-appointment/${id}`,
                    { withCredentials: true }
                ).then((res) => {
                    setAppointments(res.data.appointment)
                    console.log(appointments)
                    console.log(id)
                })

            } catch (error) {
                setAppointments([])
                console.log("Some Error occured:", error)
            }
        }
        fetchAppointments()
    }, [])
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }
    return (
        <section className='dashboard'>
            <div className="a-container">
                <h3>Hello {User.firstname} </h3>
                <p> total number of Appointments which you are currently having are {appointments.length} </p>
                <p>Details are given below</p>
                <div className="banner">
                    <h2>Appointments</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Visited</th>
                                <th>Delete</th>
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
                                            <td className={
                                                    appointment.status === "Pending"
                                                        ? "value-pending"
                                                        : appointment.status === "Rejected"
                                                            ? "value-rejected"
                                                            : "value-accepted"
                                                }>{appointment.status}</td>
                                            <td>
                                                {appointment.hasVisited === true ? <GoCheckCircleFill className='green' /> : <AiFillCloseCircle className='red' />}
                                            </td>
                                            <td className='red'>
                                                <MdDelete onClick={()=>DeleteAppointment(appointment._id)}/>
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

            </div>
        </section>
    )
}

export default AppoitnmentDelete
