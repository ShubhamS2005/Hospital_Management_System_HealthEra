import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast} from "react-toastify";

const AdmitPatient = () => {
  const { isAuthenticated} = useContext(Context);
  const [doctors,setDoctors]=useState([])

  const [wardname, setWardName] = useState("");
  const [room_name, setRoomName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [admitDate, setAdmitDate] = useState("");
  const [admited, setAdmited] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");


  const [doctor_firstname, setDoctorFirstName] = useState("");
  const [doctor_lastname, setDoctorLastName] = useState("");
  const [phone, setPhone] = useState("");
  const NavigateTo=useNavigate()

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);




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

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const HandleAdmitPatient=async(e)=>{
    e.preventDefault()
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/admin/admit-patient",
        {firstname,lastname,email,dob,gender,admitDate,wardname,room_name,admited,doctor_firstname,doctor_lastname,department,phone},
        {withCredentials:true,
          headers:"Content-Type:application/json"
        }
      ).then((res)=>{
        toast.success(res.data.messsage)
        console.log(res)
        NavigateTo("/bed")

      })
    } catch (error) {
      toast.error(error.response.data.messsage)
    }
  }

  return (
    <section className="page ">
    <h1>HealthEra</h1>
    <h3>Admit Patient</h3>
        <form onSubmit={HandleAdmitPatient}>
          <div className="form-container">
          <div >
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
          <div >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            </div>
          <div >
            <input
              type="text"
              placeholder="Ward Name"
              value={wardname}
              onChange={(e) => setWardName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room Name"
              value={room_name}
              onChange={(e) => setRoomName(e.target.value)}
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
          <div>
            <input
              type="date"
              placeholder="Date of Admit"
              value={admitDate}
              onChange={(e) => setAdmitDate(e.target.value)}
            />
            
            
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
          <select name="gender"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            >
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select name="admited"
            value={admited}
            onChange={(e)=>setAdmited(e.target.value)}
            >
              <option value="">Choose The Criteria</option>
              <option value="OPD">OPD</option>
              <option value="Emergency">Emergency</option>
              <option value="Referal">Referal</option>
            </select>
            
            
            
          </div>
        
          <button type="submit" className="Submit">Admit Patient</button>
          </div>
        </form>
      </section>  
  )
}

export default AdmitPatient
