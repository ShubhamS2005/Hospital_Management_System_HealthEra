import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Appointment = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctor_firstname, setDoctorFirstName] = useState("");
  const [doctor_lastname, setDoctorLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [hasvisited, setHasVisited] = useState("");

  const navigateTo=useNavigate()

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Radiology",
    "Neurology",
    "ENT",
    "Physical Therapy",
    "Dermatology",
    "Oncology"
  ];
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://backend-deployement-hms.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      // console.log(data.doctors);
    };
    fetchDoctors();
  }, []);


  const handleAppointment = async (e) => {
    e.preventDefault()
    try {
      const hasvisitedBool = Boolean(hasvisited)
      await axios.post("https://backend-deployement-hms.onrender.com/api/v1/appointment/post",
        {
          firstname,
          lastname,
          email,
          gender,
          dob,
          phone,
          appointmentDate,
          doctor_firstname,
          doctor_lastname,
          Address,
          department,
          hasVisited:hasvisitedBool,
        }, 
      {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        },
      }
    ).then((res)=>{
      toast.success(res.data.message);
      navigateTo("/")
    })
    
    }
    catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div className=" message-container">
        <h3>Appointment</h3>
        <form onSubmit={handleAppointment}>
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
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

          </div>

          <div>
            <input
              type='date'
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              type='date'
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value)
                setDoctorFirstName("")
                setDoctorLastName("")
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                )
              })
              }
            </select>

            <select
              value={`${doctor_firstname} ${doctor_lastname}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName)
                setDoctorLastName(lastName)
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstname} ${doctor.lastname}`}
                    key={index}
                  >
                    {doctor.firstname} {doctor.lastname}
                  </option>
                ))
              }
            </select>
          </div>
          <textarea
            name="adderss"
            id="address"
            rows={15} cols={40}
            placeholder='Address'
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className='r-link'>
            <p>Have you visited Before? </p>
            <input type="checkbox" name="hasvisted" id="hasvisited" checked={hasvisited} onChange={(e) => setHasVisited(e.target.checked)} />
          </div>
          <button type="submit" className="Submit">Get Appointment</button>
        </form>
      </div>
    </>
  )
}

export default Appointment
