import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Departments = () => {
  const responsive = {
    extra_large: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide:1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide:1,

    },
    medium: {
      breakpoint: { max: 1005, min: 200 },
      items: 2,
      slidesToSlide:1,
    },
    small: {
      breakpoint: { max: 425, min: 0 },
      items: 1,
      slidesToSlide:1,
    }
  };
  const DepartmentsArray=[
    {
      name:"Pediatrics",
    imageUrl:"/Departments/pedia.jpg",
    },
    {
      name:"Orthopedics",
    imageUrl:"/Departments/ortho.jpg",
    },
    {
      name:"Cardiology",
    imageUrl:"/Departments/cardio.jpg",
    },
    {
      name:"Neurology",
    imageUrl:"/Departments/neuro.jpg",
    },
    {
      name:"Oncology",
    imageUrl:"/Departments/onco.jpg",
    },
    {
      name:"Radio",
    imageUrl:"/Departments/radio.jpg",
    },
    {
      name:"Physical Therapy",
    imageUrl:"/Departments/therapy.jpg",
    },
    {
      name:"Dermatology",
    imageUrl:"/Departments/derma.jpg",
    },
    {
      name:"ENT",
    imageUrl:"/Departments/ent.jpg",
    }
  ]
  return (
    <section className="department">
      <div className="d-container">
        <h3>Departments</h3>
      </div>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["medium","small"]}>
        {
          DepartmentsArray.map((depart,index)=>{
            return(
              <div className="card" key={index}>
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt={depart.name} />
              </div>
            )
          })
        }
      </Carousel>
    </section>
  )
}

export default Departments
