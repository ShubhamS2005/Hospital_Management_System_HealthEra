import React, { useContext, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context)
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

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

  const NavigateTo = useNavigate()
  const handleAvatar = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    }
  }
  const HandleNewDoctor = async (e) => {

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname)
      formData.append("lastname", lastname)
      formData.append("email", email)
      formData.append("phone", phone)
      formData.append("gender", gender)
      formData.append("dob", dob)
      formData.append("doctorDepartment", doctorDepartment)
      formData.append("password", password)
      formData.append("docAvatar", docAvatar)

      await axios.post(
        "https://backend-deployement-hms.onrender.com/api/v1/user/doctor/addnew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          toast.success(res.data.message)
          NavigateTo("/")
        })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <section className="page ">
        <h1>Add New Doctor</h1>
        <form onSubmit={HandleNewDoctor}>
          <div className='doctor-add'>
            <div className="first-wrapper">
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                } alt="Doctor Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div className="form-container-doctor">

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

              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                id="depart"
                value={doctorDepartment}
                onChange={(e) => setDoctorDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {
                  departmentsArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    )
                  })
                }
              </select>
              <button type="submit" className="Submit">Register New Doctor </button>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddNewDoctor
