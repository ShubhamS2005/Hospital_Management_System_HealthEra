import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePatient = () => {
  const { isAuthenticated, id } = useContext(Context);
  const [wardId, setWardId] = useState("");

  const [wardname, setWardName] = useState("");
  const [room_name, setRoomName] = useState("");

  const [patient, setPatient] = useState({});

  const NavigateTo = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  useEffect(() => {
    const fetchpatient = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/user/get-patient/${id}`,
          { withCredentials: true }
        );
        setPatient(data.patient);
        setWardId(data.patient.wardId);
      } catch (error) {
        console.log("Some Error occured", error);
      }
    };
    fetchpatient();
  });

  const HandleUpdatePatient = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        wardname: wardname,
        room_name: room_name,
        oldid: wardId,
      };
      await axios
        .put(
          `http://localhost:8000/api/v1/user/patient/updateId/${id}`,
          updateData,
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          NavigateTo('/bed')
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="BedUpdate page">
      <h1>HealthEra</h1>
      <div>
        <button
          onClick={() => NavigateTo("/bed")}
          style={{ position: "fixed", right: "5%", top: "5%" }}
        >
          Return Previous Page
        </button>
      </div>
      <h3>
        Update Patient Room of
        <span>{` ${patient.firstname} ${patient.lastname}`}</span>
      </h3>
      <p style={{textAlign:"center"}}>Here You can transfer the bed by changing Ward and Room name</p>
      <div className="update" style={{justifyContent:"center",textAlign:"center"}}>
        <form onSubmit={HandleUpdatePatient}>
          <div>
            <input
              type="text"
              value={wardname}
              placeholder="Ward Name"
              onChange={(e) => setWardName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={room_name}
              placeholder="Room Name"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
        <div>

          <button type="submit" className="Submit" style={{justifyContent:"center",textAlign:"center"}}>
            Update
          </button>
        </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePatient;
