import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeCarousel from '../components/HomeCarousel'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import { Card } from 'react-bootstrap'
import EmblaCarousel from '../components/EmblaCarousel/EmblaCarousel'
import { getHomeVehiclesApi } from '../Services/allApi'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    const [homeVehicles,setHomeVehicles] = useState([])
    const navigate = useNavigate()

    useGSAP(()=>{
        gsap.to('.home-card',{
            y:0,
            opacity:1,
            duration:1.2,
            stagger:{
                amount:2.5,
            },
            scrollTrigger:{
                trigger:".home-sec-2",
                start:'top 70%',
                end:"bottom 70%",
                scrub:true
            }
        })
    },[])

    useEffect(()=>{
        getHomeVehicles()
    },[])
    const getHomeVehicles = async ()=>{
        try{
            const result =await getHomeVehiclesApi()
            if (result.status == 200) {
                console.log(result.data);
                setHomeVehicles(result.data)
            }
        }catch(err){
            console.log(err);
            
        }
    }
    const handleNavigate = ()=>{
        const token = sessionStorage.getItem("token")
        if(token){
          navigate('/vehicles')
        }else{
          navigate('/login')
        }
      }

    return (
        <>
            <Header insideHome={true} />
            <div className='w-100 sec1 position-sticky'>
                <HomeCarousel />
            </div>
            <div className="container-fluid p-5 home-sec-2">
                <h1 style={{ color: "rgb(152, 16, 16)" }} className="text-center fw-bolder mt-5 home-card">Know More About Our Services</h1>
                <p className="container-fluid text-center p-5 mt-3 rounded shadow bg-light home-card">
                    Discover the convenience and benefits of car subscription with <span className='text-danger fw-bolder'>WOD</span>. Our customer-friendly system ensures a seamless experience for your favorite pick. Enjoy zero down payment, free insurance, and complimentary maintenance and service. With the freedom to return or extend your subscription anytime,<span className='text-danger fw-bolder'>WOD</span> guarantees your happiness on the road. Choose <span className='text-danger fw-bolder'>Wheels On The Go</span> and experience the joy of hassle-free car subscription today.
                </p>
                <div className="row">
                    <div className="col-lg-3 p-2 d-flex justify-content-center">
                        <Card className='p-3 shadow border-warning' style={{ width: '18rem' }}>
                            <Card.Body className='home-card'>
                                <Card.Title className='text-center'>
                                    <i class="fa-solid fa-credit-card"></i><br />
                                    No Hidden Charges
                                </Card.Title>
                                <Card.Text>
                                    <ul>
                                    <li>Access to a Vehicle Without Financial Strain</li>
                                    <li>No need to pay hefty Road Tax</li>
                                    <li>Cheaper than EMI</li>

                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-3 p-2 d-flex justify-content-center">
                        <Card className='p-3 shadow border-warning' style={{ width: '18rem' }}>
                            <Card.Body className='home-card'>
                                <Card.Title className='text-center'>
                                <i class="fa-solid fa-hospital"></i><br />
                                    Free Insurance
                                </Card.Title>
                                <Card.Text>
                                    <ul>
                                    <li>No additional financial burden of paying for insurance
                                    </li>
                                    <li>Comprehensive Coverage</li>

                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-lg-3 p-2 d-flex justify-content-center">
                        <Card className='p-3 shadow border-warning' style={{ width: '18rem' }}>
                            <Card.Body className='home-card'>
                                <Card.Title className='text-center'>
                                <i class="fa-solid fa-gears"></i><br />
                                    Free Servicing
                                </Card.Title>
                                <Card.Text>
                                    <ul>
                                    <li>Cost Savings
                                    </li>
                                    <li>24*7 roadside assistance</li>

                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-lg-3 p-2 d-flex justify-content-center">
                        <Card className='p-3 shadow border-warning' style={{ width: '18rem' }}>
                            <Card.Body className='home-card'>
                                <Card.Title className='text-center'>
                                <i class="fa-solid fa-road"></i><br />
                                    No Limits
                                </Card.Title>
                                <Card.Text>
                                    <ul>
                                    <li>Return anytime</li>
                                    <li>Extend anytime</li>

                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <hr />
            <div className="home-sec-3 w-100 mt-5">
                <h1 className="text-center fw-bolder text-success my-5">
                    Products
                </h1>
                <EmblaCarousel vehicleData ={homeVehicles}/>
                <div className="my-5 text-center">
                    <button onClick={handleNavigate} className='btn btn-warning text-dark'>View All...</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home