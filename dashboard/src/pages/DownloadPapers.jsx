import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { Context } from "../main";
import { FaFileDownload } from "react-icons/fa";

import axios from "axios";

const DownloadPapers = () => {
  const { isAuthenticated, id, user } = useContext(Context);
  const [patient, setPatient] = useState({});
  const [ward, setWard] = useState({});
  const [dob, setDob] = useState("");
  const [discharge, setDischarge] = useState("");
  const [admit, setAdmit] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [url, setUrl] = useState({});

  
  
  useEffect(() => {
      const fetchPatient = async () => {
          try {
        const { data } = await axios.get(
          `https://backend-deployement-hms.onrender.com/api/v1/user/get-patient/${id}`,
          { withCredentials: true }
        );
        setPatient(data.patient);
        setWard(data.ward);
        setFirstName(data.patient.doctor.firstname);
        setLastName(data.patient.doctor.lastname);
        setDob(data.patient.dob);
        setAdmit(data.patient.admitDate);
        setDischarge(data.patient.discharge_date);

        if (data.PatientData.patientAvatar) {
          setUrl(data.PatientData.patientAvatar.url);
        }
      } catch (error) {
        setPatient({});
        console.log("some error occured ", error);
      }
    };
    fetchPatient();
  }, []);
  const { toPDF, targetRef } = usePDF({ filename: `Discharge-${patient.firstname}-${patient.lastname}-${id}.pdf` });
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="dashboard page">
        <div
          style={{
            display: "flex",
            marginTop:"3%",
            marginRight: "7%",
            justifyContent: "flex-end",
            fontSize:"2.1rem",
            cursor:"pointer",
          }}
          onClick={() => toPDF()}
        >
          <FaFileDownload /> 
        </div>
        <div ref={targetRef}>
          <h1 style={{ marginTop: "-10px", marginBottom: "-10px" }}>
            HealthEra
          </h1>
          <div className="discharge">
            <div className="personal">
              <div className="content">
                <h2>Personal Details </h2>
                <p>
                  Patient Name:
                  <span>{` ${patient.firstname} ${patient.lastname}`}</span>
                </p>
                <p>
                  DOB:<span>{dob.substring(0, 10)}</span>
                </p>
                <p>
                  Phone Number:<span>{patient.phone}</span>
                </p>
                <p style={{ textTransform: "none" }}>
                  Email Id:<span>{patient.email}</span>
                </p>
                <p>
                  Gender:<span>{patient.gender}</span>
                </p>
                <p>
                  Admited Through :<span>{patient.admited}</span>
                </p>
              </div>
              <div className="img">
                <img
                  src={url.length > 0 ? `${url}` : "/patientHolder.png"}
                  alt="No image Added"
                />
              </div>
            </div>
            <div className="discharge-info">
              <h2>Discharge Information </h2>
              <p>
                Discharging Facility:
                <span>{` ${user.firstname} ${user.lastname}`}</span>
              </p>
              <p>
                Discharge Facility Phone Number:<span>{user.phone}</span>
              </p>
              <p>
                Doctor Name:<span> {`${firstname} ${lastname}`}</span>
              </p>
              <p>
                Doctor Department:<span> {patient.department}</span>
              </p>
              <p>
                Admit Date:<span> {admit.substring(0, 10)}</span>
              </p>
              <p>
                Discharge Date:<span> {discharge.substring(0, 10)}</span>
              </p>
            </div>
            <div className="billing">
              <h2>Billing Information </h2>
              <p>
                Ward Name:<span>{ward.wardname}</span>
              </p>
              <p>
                Room Name:<span> {ward.room_name}</span>
              </p>
              <p>
                Admited for Number of days:<span>{ward.number_of_days}</span>
              </p>
              <p>
                Aggeregate Bill:<span>{patient.cost}</span>
              </p>
              <p>
                Confirmed By:<span>{`${user.firstname} ${user.lastname}`}</span>
              </p>
            </div>
            <div className="boxes">
              <div className="box">
                <p>Admin facility</p>
              </div>
              <div className="box">
                <p>Discharging Doctor</p>
              </div>
              <div className="box">
                <p>Hospital Stamp</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DownloadPapers;
