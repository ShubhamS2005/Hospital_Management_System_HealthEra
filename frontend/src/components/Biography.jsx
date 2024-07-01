import React from 'react'

const Biography=({imageUrl})=> {
  return (
    <>
      <section className="bio">
        <div className="img">
          <img src={imageUrl} alt="Biography" />
        </div>
        <div className="container">
          <h3>Biography</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nulla obcaecati deserunt ab nobis esse blanditiis maiores ea fugiat, quis magnam, dolor corporis sunt impedit quos nesciunt. Aliquid unde neque sunt labore officiis, molestias ea cum similique, eius, illo laudantium totam non ullam vel provident reprehenderit doloribus accusamus placeat distinctio?</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, iusto aliquid. Beatae odio sequi alias voluptatibus, dolor soluta. Sint quaerat magnam eos porro iste quis ex minus praesentium facilis dolorum molestias voluptates neque, ducimus, temporibus iure omnis illo molestiae adipisci!</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, optio. This is a MERN Stack Project made for illustration puropse by shubham</p>
        </div>
      </section>
    </>
  )
}

export default Biography
