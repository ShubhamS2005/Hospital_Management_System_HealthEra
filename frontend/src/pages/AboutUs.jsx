import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
const AboutUs=()=> {
  return (
    <>
      <Hero title="Learn More about Us| HealthEra New Generation" imageUrl={"/photos/discussing_group.png"}/>
      <Biography imageUrl={"/photos/connectivity.png"}/>
    </>
  )
}

export default AboutUs
