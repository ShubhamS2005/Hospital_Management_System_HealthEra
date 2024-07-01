import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaLocationArrow } from "react-icons/fa"
import { MdEmail } from "react-icons/md"


const Footer = () => {
    const Hours = [
        {
            id: 1,
            day: "Monday",
            time: "9:00 AM-11:00 PM"
        },
        {
            id: 2,
            day: "Tuesday",
            time: "9:00 AM-11:00 PM"
        },
        {
            id: 3,
            day: "Wednesday",
            time: "10:00 AM-10:00 PM"
        },
        {
            id: 4,
            day: "Thursday",
            time: "9:00 AM-11:00 PM"
        },
        {
            id:5,
            day: "Friday",
            time: "12:00 AM-12:00 PM"
        },
        {
            id: 6,
            day: "Saturday",
            time: "9:00 AM-11:00 PM"
        },
        {
            id: 7,
            day: "Sunday",
            time: "10:00 AM-11:00 PM"
        },
    ]
    return (
        <>
            <hr />
            <footer className='footer'>
                <div className="content">
                    HealthEra
                </div>

                <div className='quicklinks'>
                    <h4>Quick Links</h4>
                    <ul>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/appointment"}>Appointment</Link>
                        <Link to={"/about"}>About Us</Link>

                    </ul>
                </div>
                <div className="hours">
                    <h4>Hours</h4>
                    {
                        Hours.map((element) => {
                            return (
                                <li key={element.id}>
                                    <span>{element.day}</span> 
                                    <span>{element.time}</span>
                                </li>
                            )
                        })
                    }
                </div>
                <div className="contact">

                    <h4>Contact</h4>
                    <div>
                        <FaPhone />
                        <span> 999-999-9999</span>
                    </div>
                    <div>
                        <MdEmail />
                        <span> HealthEra@gmail.com</span>
                    </div>

                    <div>
                        <FaLocationArrow />
                        <span> Renukoot ,India</span>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
