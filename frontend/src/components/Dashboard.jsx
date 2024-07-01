import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { User, setUser } = useContext(Context);

  return (
    <section className="dashboard">
      <h3>User Dashboard</h3>
      <div className="n-container">
      <div className="card">
            <h4>Features</h4>
            <span>1. Add Health Details</span>
            <span>2. Check Status of Appointments</span>
            <span>3. Cancel Appointments</span>
            <span>4. Book Beds and Facilites</span>
            <span>5. Check the billings</span>
            <span>6. Update Your data</span>
        </div>
        <div className="card">
          <div className="content">
            <h4>Patient Details</h4>
            <p>
              Email: <span>{User.email}</span>
            </p>
            <p>
              Phone: <span>{User.phone}</span>
            </p>
            <p>
              Dob: <span>{User.dob.substring(0, 10)}</span>
            </p>
            <p>
              Gender: <span>{User.gender}</span>
            </p>
            <p>
              Blood Group: <span>{User.bloodgrp}</span>
            </p>
            <p>
              Height: <span>{User.height}</span>
            </p>
            <p>
              Weight: <span>{User.weight}</span>
            </p>
            <p>
              Medical History: <span>{User.MedicalHistory}</span>
            </p>
          </div>
        </div>
        
        <div className="d-box">
          <div className="c-box">
            <img src={User.patientAvatar.url} alt="Patient Avatar" />
            <h4>
              Hello {User.firstname} {User.lastname}
            </h4>
          </div>
        </div>
        

      </div>

      
      <div className="links">
        <Link to={"/update-patient"}>Update Data</Link>
        <Link to={"/appointment-status"}>Appointment Status</Link>
        <Link to={"/add-health-details"}>Add Details</Link>
      </div>
    </section>
  );
};

export default Dashboard;
