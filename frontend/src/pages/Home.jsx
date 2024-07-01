import React from 'react'
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Departments from "../components/Departments"
import MessageForm from "../components/MessageForm"
import NavBar from '../components/NavBar'



const Home=()=>{
  return (
    <>
    {/* These all are components used in home file */}
    <Hero title={"Welcome To HealthEra | Your Trusted HealthCare Provider"} imageUrl={"/public/photos/front_doctor.png"}/>
    <Biography imageUrl={"/public/photos/computer.png"}/>
    <Departments/>
    <MessageForm/> 
    </>
  )
}

export default Home
