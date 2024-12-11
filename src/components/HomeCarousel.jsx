import React from 'react'
import { Carousel } from 'react-bootstrap'
import img4 from "../assets/img4.jpg"
import img5 from "../assets/img5.webp"
import img6 from "../assets/img6.jpg"

const HomeCarousel = () => {
  return (
    <div style={{height:"100vh"}} className='rounded'>
      <Carousel style={{height:"100vh"}} className='rounded'>
        <Carousel.Item interval={1000}>
          <img className='carimg' src={img4} alt="" />
          <Carousel.Caption>
            <h1 className='text-warning'>WHEELS ON DEMAND</h1>
            <p className='text-primary'>Rent a Car or a TwoWheeler just in 1 min </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
        <img className='carimg' src={img5} alt="" />
          <Carousel.Caption>
            <h1 className='text-warning'>50+ cars and 20+ Two wheelers</h1>
            <p>We have More than 50 cars and more coming soon</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img className='carimg' src={img6} alt="" />
          <Carousel.Caption className='bg-dark rounded shadow'>
            <h1 className='text-warning'>EASY BOOKINGS</h1>
            <p>
              Hassle Free booking experiance
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>

  )
}

export default HomeCarousel