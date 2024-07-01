import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';

const BedAdd = () => {
  const { isAuthenticated} = useContext(Context);
  const [wardname, setWardName] = useState("");
  const [room_name, setRoomName] = useState("");
  const [capacity, setRoomType] = useState("");
  const [number_of_beds, setBeds] = useState("");
  const [number_of_rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [facilities, setFacilities] = useState("");

  const NavigateTo=useNavigate()


  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const HandleNewWard=async(e)=>{
    e.preventDefault()
    try {
        await axios.post(
            "http://localhost:8000/api/v1/user/admin/postward",
            {wardname,room_name,capacity,number_of_beds,number_of_rooms,price,facilities},
            {
                withCredentials:true,
                headers:"Content-Type:application/json"
            }
        ).then((res)=>{
            toast.success(res.data.message)
              NavigateTo("/bed")
        })
    } catch (error) {
      toast.error(error.response.data.message)
    } 
  }
  return (
    <section className="page ">
    <h1>HealthEra</h1>
    <h3>Add New Ward</h3>
        <form onSubmit={HandleNewWard}>
          <div className="form-container">
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
         
            <input
              type="text"
              placeholder="Room Type"
              value={capacity}
              onChange={(e) => setRoomType(e.target.value)}
            />
            <input
              type="number"
              placeholder="Number of Beds"
              value={number_of_beds}
              onChange={(e) => setBeds(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Number of Rooms"
              value={number_of_rooms}
              onChange={(e) => setRooms(e.target.value)}
            />
            <input
              type='number'
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <textarea 
            name="facilities" 
            id="facilities"
            placeholder='Enter the facilities'
            value={facilities}
            onChange={(e) => setFacilities(e.target.value)}
            rows={10} cols={30}
            />
          </div>

          <button type="submit" className="Submit">Add New Ward </button>
          </div>
        </form>
      </section>  
  )
}

export default BedAdd
