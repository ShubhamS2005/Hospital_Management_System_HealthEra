import React, { useContext,useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { CiBoxList } from "react-icons/ci";



const DishchargePapers = () => {
  const [patients, setPatients] = useState([]);
  const { isAuthenticated ,id,setId} = useContext(Context);


  const NavigateTo = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
          const { data } = await axios.get(
            "http://localhost:8000/api/v1/user/getallpatients",
            { withCredentials: true }
          )
          setPatients(data.patients)
      } catch (error) {
        setPatients([])
        console.log("some error occured ", error)
      }
    }
    fetchPatients()
  })
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="page dashboard" >
        <div className="banner">
          <h1 style={{justifyContent:"center"}}>HealthEra</h1>
          <div >
          <button onClick={()=>NavigateTo("/bed")} style={{position:"fixed",right:"5%",top:'5%'}}>
              Return Previous Page
          </button>
          
          </div>
          <h3>Discharged Patients of HealthEra </h3>
          <div style={{overflowX:"auto"}}>

          <table>
            <thead>
              <tr >
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Doctor Name</th>
                <th>Department</th>
                <th>Admit Date</th>
                <th>Ward Name</th>
                <th>Criteria</th>
                <th>Number of Days</th>
                <th>Amount Charged</th>
                <th>View Discharge Paper</th>
              </tr>
            </thead>
            <tbody>
              {patients && patients.length > 0 ? (
                patients
                .filter((patient) => patient.is_discharged === 1)
                .map((patient) => {
                  return (
                    <tr key={patient._id} >
                      <td>{`${patient.firstname} ${patient.lastname}`}</td>
                      <td style={{textTransform:"none"}}>{patient.email}</td>
                      <td>{patient.phone}</td>
                      <td>{`${patient.doctor.firstname} ${patient.doctor.lastname}`} </td>
                      <td>{patient.department}</td>
                      <td>{patient.admitDate.substring(0, 10)}</td>
                      <td>{patient.wardname} </td>
                      <td>{patient.admited} </td>
                      <td>{patient.number_of_days}</td>
                      <td>{patient.cost}</td>
                      <td 
                      className="discharge-paper" 
                      >
                        <CiBoxList onClick={() => [setId(patient._id),NavigateTo("/download-papers")]}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Patient Discharged</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default DishchargePapers
