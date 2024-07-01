import React from 'react'

const Hero = ({ title, imageUrl }) => {
  return (
    <section className="m-container">
      <div className="container">
        <h3>{title}</h3>
        <p>HeathEra is a Medical Institute which offers various kinds of facillities which are dedicated to providing world class HealthCare with passion and expertise.Our team of skilled proffestionals is commited in delivering personalized care and to boost this HealthEra is an online platform which can eaisly connect patients and doctors with ease and will remove the paperwork which takes time in operations and different works </p>
        
      </div>
      <div className="img">
        <img src={imageUrl} alt="doctor image" />
      </div>
    </section>
  )
}

export default Hero
