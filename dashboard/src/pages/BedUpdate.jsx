import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const BedUpdate = () => {
  const { isAuthenticated, id, setId } = useContext(Context);
  const [wardname, setWardName] = useState("");
  const [room_name, setRoomName] = useState("");
  const [capacity, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [facilities, setFacilities] = useState("");

  const [wnamefun, setWnameFun] = useState(true);
  const [rnamefun, setRnameFun] = useState(false);
  const [rtypefun, setRtypeFun] = useState(false);
  const [pricefun, setPriceFun] = useState(false);
  const [facfun, setFacFun] = useState(false);

  const NavigateTo = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const HandleUpdateWard = async (e) => {
    e.preventDefault();
    try {
      if (wnamefun) {
        const updateData = {
          wardname: wardname,
        };
        await axios
          .put(
            `https://backend-deployement-hms.onrender.com/api/v1/user/ward/update/${id}`,
            updateData,
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
          });
      } else if (rnamefun) {
        const updateData = {
          room_name: room_name,
        };
        await axios
          .put(
            `https://backend-deployement-hms.onrender.com/api/v1/user/ward/update/${id}`,
            updateData,
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
          });
      } else if (rtypefun) {
        const updateData = {
          capacity: capacity,
        };
        await axios
          .put(
            `https://backend-deployement-hms.onrender.com/api/v1/user/ward/update/${id}`,
            updateData,
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
          });
      } else if (pricefun) {
        const updateData = {
          price: price,
        };
        await axios
          .put(
            `https://backend-deployement-hms.onrender.com/api/v1/user/ward/update/${id}`,
            updateData,
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
          });
      } else if (facfun) {
        const updateData = {
          facilities: facilities,
        };
        await axios
          .put(
            `https://backend-deployement-hms.onrender.com/api/v1/user/ward/update/${id}`,
            updateData,
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
            NavigateTo("/bed");
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const change1 = () => {
    setWnameFun(true);
    setRnameFun(false);
    setRtypeFun(false);
    setPriceFun(false);
    setFacFun(false);
  };
  const change2 = () => {
    setWnameFun(false);
    setRnameFun(true);
    setRtypeFun(false);
    setPriceFun(false);
    setFacFun(false);
  };
  const change3 = () => {
    setWnameFun(false);
    setRnameFun(false);
    setRtypeFun(true);
    setPriceFun(false);
    setFacFun(false);
  };

  const change4 = () => {
    setWnameFun(false);
    setRnameFun(false);
    setRtypeFun(false);
    setPriceFun(true);
    setFacFun(false);
  };
  const change5 = () => {
    setWnameFun(false);
    setRnameFun(false);
    setRtypeFun(false);
    setPriceFun(false);
    setFacFun(true);
  };

  return (
    <section className="BedUpdate page">
      <h1>HealthEra</h1>
      
      <h3>Update Data</h3>
      <p>Click the button among which, field you want to update</p>
      <div className="update">
        <button className="btn" onClick={change1}>
          Ward Name
        </button>
        <button className="btn" onClick={change2}>
          Room Name
        </button>
        <button className="btn" onClick={change3}>
          Room Type{" "}
        </button>
        <button className="btn" onClick={change4}>
          Price
        </button>
        <button className="btn" onClick={change5}>
          Facilities
        </button>

        <form onSubmit={HandleUpdateWard}>
          <div
            style={
              wnamefun === true ? { display: "flex" } : { display: "none" }
            }
          >
            <input
              type="text"
              placeholder="Ward Name"
              value={wardname}
              onChange={(e) => setWardName(e.target.value)}
            />
          </div>
          <div
            style={
              rnamefun === true ? { display: "flex" } : { display: "none" }
            }
          >
            <input
              type="text"
              value={room_name}
              placeholder="Room Name"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div
            style={
              rtypefun === true ? { display: "flex" } : { display: "none" }
            }
          >
            <input
              type="number"
              value={capacity}
              placeholder="Capacity"
              onChange={(e) => setRoomType(e.target.value)}
            />
          </div>

          <div
            style={
              pricefun === true ? { display: "flex" } : { display: "none" }
            }
          >
            <input
              type="number"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div
            style={facfun === true ? { display: "flex" } : { display: "none" }}
          >
            <textarea
              rows={10}
              cols={30}
              value={facilities}
              placeholder="Mention The facilities"
              onChange={(e) => setFacilities(e.target.value)}
            />
          </div>
          <button type="submit" className="Submit">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default BedUpdate;
