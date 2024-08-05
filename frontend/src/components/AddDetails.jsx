import React, { useState,useContext,useEffect } from 'react'
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddDetails = () => {
    const { isAuthenticated,User,setUser } = useContext(Context)
  const [bloodgrp, setBloodgrp] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [MedicalHistory, setMedicalHistory] = useState("");
  const [patientAvatar, setPatientAvatar] = useState("");
  const [patientAvatarPreview, setPatientAvatarPreview] = useState("");

  const NavigateTo = useNavigate()
  const handleAvatar = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPatientAvatarPreview(reader.result);
      setPatientAvatar(file);
    }
  }
  const HandleAddDetails=async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData();
       formData.append("bloodgrp", bloodgrp)
      formData.append("height", height)
      formData.append("weight", weight)
      formData.append("MedicalHistory", MedicalHistory)
      formData.append("patientAvatar", patientAvatar)

       await axios.put(`https://backend-deployement-hms.onrender.com/api/v1/user/add-details/${User._id}`, 
        formData,
        {withCredentials:true,
          headers: { "Content-Type": "multipart/form-data" },
        }
       ).then((res)=>{
        toast.success(res.data.message)
        setUser(res.data.patient)
        NavigateTo("/user-dashboard")
    })
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }
  return (
      <section className="dashboard ">
        <h3>Add Details</h3>
        <h1>Hello {`${User.firstname} ${User.lastname}`} </h1>
        <p style={{margin:20}}>here you can add health details </p>
        <form onSubmit={HandleAddDetails}>
          <div className='patient-add'>
            <div className="first-wrapper">
              <img
                src={
                    patientAvatarPreview ? `${patientAvatarPreview}` : "Sample_images/patientHolder.png"
                } alt="Patient Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            <div className="form-container-patient">

              <input
                type="text"
                placeholder="Enter your Blood Group"
                value={bloodgrp}
                onChange={(e) => setBloodgrp(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter Your Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />


              <input
                type="number"
                placeholder="Enter Your Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <textarea name="Medical"
                placeholder='Enter your Medical History'
               cols="30" 
               rows="10"
               value={MedicalHistory}
               onChange={(e)=>setMedicalHistory(e.target.value)}></textarea>

              <button type="submit" className="Submit">Add Details </button>
            </div>
          </div>
        </form>
      </section>
  )
}

export default AddDetails
