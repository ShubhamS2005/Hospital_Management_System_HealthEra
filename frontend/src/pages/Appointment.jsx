import React from 'react'
import Hero from '../components/Hero'
import Appointment from '../components/Appointment.jsx'


const appointment=()=> {
  return (
    <>
    <Hero title={"Schedule Your Appointment | Fast and Easy of Connection"} imageUrl={"/photos/appointment.png"}/>
    <Appointment/>
    </>
  )
}

export default appointment
