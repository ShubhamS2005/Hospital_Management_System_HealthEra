import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlinePersonRemove } from "react-icons/md";

const BedStatus = () => {
  const { isAuthenticated, user, setId } = useContext(Context);

  const [total_beds, setTotalBeds] = useState(0);
  const [total_rooms, setTotalRooms] = useState(0);
  const [totalAvailableBeds, setTotalAvailableBeds] = useState(0);
  const [show, setShow] = useState(true);
  const [wards, setWards] = useState([]);
  const [wardpatient, setWardPatient] = useState([]);
  const [wardid, setWardId] = useState("");
  const [wardname, setWardName] = useState("");
  const [wardroom, setWardRoom] = useState("");


  // const { toPDF, targetRef } = usePDF({filename: {`Discharge-${}-${}.pdf`}});


  const NavigateTo = useNavigate();
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-deployement-hms.onrender.com/api/v1/user/getallwards",
          { withCredentials: true }
        );
        setWards(data.wards);
        setTotalBeds(data.total_beds);
        setTotalRooms(data.total_rooms);
        setTotalAvailableBeds(data.availableBeds)
      } catch (error) {
        setWards([]);
        console.log("Some Error occured", error);
      }
    };
    fetchWards();
  }, []);

  const DeleteWard = async (e, wardid) => {
    try {
      e.preventDefault();
      await axios
        .delete(`https://backend-deployement-hms.onrender.com/api/v1/user/ward/delete/${wardid}`)
        .then((res) => {

          toast.success(res.data.message);
          NavigateTo("/bed");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchWardPatient = async () => {
      try {
        if (wardid) {
          const { data } = await axios.get(
            `https://backend-deployement-hms.onrender.com/api/v1/user/get-ward-patients/${wardid}`,
            { withCredentials: true }
          )
          setWardPatient(data.wardmates)
          setWardName(data.wardname)
          setWardRoom(data.roomname)
        }
        else {
          console.log(wardpatient)
        }

      } catch (error) {
        setWardPatient([])
        console.log("some error occured ", error)
      }
    }
    fetchWardPatient()
  }, [wardid])

  const changeWardid = (id) => {
    setWardId(id)
    setShow(false)
  }
  const changeid = (id) => {
    setId(id)
  }

  const DischargePatient=async(wardid,patid)=>{
    try {
      const updateData = {
        wardId:wardid
      };
      await axios
        .put(
          `https://backend-deployement-hms.onrender.com/api/v1/user/patient/discharge/${patid}`,
          updateData,
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          NavigateTo("/login")
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page " style={show ? ({ display: "block" }) : ({ display: "none" })}>
        <div className="banner" >
          <div className="b-container">
            <div className="secondBox">
              <h3>Total Wards</h3>
              <span>{wards.length}</span>
              <span>
                <Link to={`/add-bed`}>
                  <MdOutlineAddCircleOutline />
                </Link>
              </span>
            </div>
            <div className="thirdBox">
              <h3>Total Beds</h3>
              <span> {total_beds} </span>
            </div>
            <div className="secondBox">
              <h3>Total Avalaible Beds</h3>
              <span>{totalAvailableBeds}</span>
            </div>

            <div className="thirdBox">
              <h3>Total Rooms</h3>
              <span>{total_rooms}</span>
            </div>
            <button onClick={() => NavigateTo("/discharge-papers")} >
              Discharge Papers
          </button>
          </div>
        </div>
        <div className="banner">
          <h3>Bed Summary </h3>
          <div style={{overflowX:"auto"}}>

          <table>
            <thead>
              <tr>
                <th>Ward Name</th>
                <th>Room Name</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Number of Rooms</th>
                <th>Number of Beds</th>
                <th>Facilities</th>
                <th>Update Ward</th>
                <th>Delete Ward</th>
                <th>Show Patients</th>
              </tr>
            </thead>
            <tbody>
              {wards && wards.length > 0 ? (
                wards.map((ward) => {
                  return (
                    <tr key={ward._id}>
                      
                      <td>{ward.wardname}</td>
                      <td>{ward.room_name}</td>
                      <td>{ward.capacity}</td>
                      <td>{ward.price}</td>
                      <td>{ward.number_of_rooms}</td>
                      <td>{ward.number_of_beds} </td>
                      <td>{ward.facilities} </td>
                      <td>
                        <Link onClick={() => changeid(ward._id)} to={`/update-bed`}>
                          <RxUpdate />
                        </Link>
                      </td>
                      <td
                        className="tdButton red"
                        onClick={(e) => {
                          DeleteWard(e, ward._id);
                        }}
                      >
                        <RiDeleteBin2Fill />
                      </td>
                      <td className="tdButton green"
                        onClick={() => changeWardid(ward._id)}>
                        <IoPersonSharp />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Wards</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

        </div>
      </section>
      <section className="page dashboard" style={!show ? ({ display: "block" }) : ({ display: "none" })}>

        <div className="banner">
          <h1 style={{justifyContent:"center"}}>HealthEra</h1>
          <div >
          <button onClick={()=>setShow(true)} style={{position:"fixed",right:"5%",top:'5%'}}>
              Return Previous Page
          </button>
          
          </div>
          <h3>Patient Summary in {wardroom} room of  {wardname} </h3>
          <div style={{overflowX:"auto"}}>

          <table>
            <thead>
              <tr >
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Dob</th>
                <th>Gender</th>
                <th>Doctor Name</th>
                <th>Department</th>
                <th>Admit Date</th>
                <th>Criteria</th>
                <th>Change Room</th>
                <th >Discharge Patient </th>
              </tr>
            </thead>
            <tbody>
              {wardpatient && wardpatient.length > 0 ? (
                wardpatient
                .filter((ward) => ward.is_discharged === 0)
                .map((ward) => {
                  return (
                    <tr key={ward._id} >
                      <td>{`${ward.firstname} ${ward.lastname}`}</td>
                      <td style={{textTransform:"none"}}>{ward.email}</td>
                      <td>{ward.phone}</td>
                      <td>{ward.dob.substring(0, 10)}</td>
                      <td>{ward.gender} </td>
                      <td>{`${ward.doctor.firstname} ${ward.doctor.lastname}`} </td>
                      <td>{ward.department}</td>
                      <td>{ward.admitDate.substring(0, 10)}</td>
                      <td>{ward.admited} </td>
                      <td className="tdButton green">
                        <Link onClick={() => changeid(ward._id)} to={`/update-patient`}>
                          <RxUpdate />
                        </Link>
                      </td>
                      <td className="tdButton red" 
                        onClick={() => DischargePatient(ward.wardId,ward._id)}>
                      <MdOutlinePersonRemove />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Patient Admited in this Ward</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>


        </div>
      </section>
    </>
  );
};

export default BedStatus;
