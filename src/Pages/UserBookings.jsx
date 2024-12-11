import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from 'react-bootstrap'
import { cancelBookingApi, getUserBookingsApi } from '../Services/allApi'
import serverUrl from '../Services/serverUrl'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cancelResponseContext } from '../contextApi/ContextShare'


const UserBookings = () => {
    const {cancelResponse,setCancelresponse} = useContext(cancelResponseContext)
    const navigate = useNavigate()
    const [userBookings, setUserBookings] = useState([])
    // useGSAP(() => {
    //     gsap.from(".userBooking-card", {
    //         opacity: 0,
    //         x: 100,
    //         delay: 1,
    //         stagger: 1.5
    //     })
    // }, { dependencies: [userBookings,cancelResponse], revertOnUpdate: true })
    useEffect(() => {
        getUserBookings()
    }, [cancelResponse])
    const getUserBookings = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getUserBookingsApi(reqHeader)
                if (result.status == 200) {
                    setUserBookings(result.data)
                    console.log(userBookings);
                    setCancelresponse(result)

                } else {
                    log(result.response.data)
                }
            } catch (err) {
                console.log(err);

            }
        }
    }
    const cancelBookings = async (bid)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try{
                const result = await cancelBookingApi(bid,reqHeader)
            }catch(err){
                console.log(err);
                
            }
        }else{
            alert("Please Login to continue")
            
        }
    }

    return (
        <div>
            <Header insideUserBookings={true} />
            <h1 className="mt-5 ms-5">Active</h1>
            <hr className='mx-5' />
            <div style={{ minHeight: "100vh" }} className="row w-100 my-3">
                <div className="col-lg-2"></div>
                <div style={{ borderRadius: "20px" }} className='col-lg-8'>
                    {
                        userBookings.length ?
                            userBookings.toReversed().map(booking => (
                                <div style={{ borderRadius: "20px" }} className='w-100 border mt-5 shadow p-3 bg-dark text-light userBooking-card'>
                                    <div className=" row w-100 ">
                                        <div className='col-lg-4 d-flex justify-content-center align-items-start flex-column'>
                                            <h3>{booking.Model}</h3>
                                            <img onClick={() => { navigate(`/${booking.vehicleId}/view`) }} width={"200px"} height={"100"} src={`${serverUrl}/uploads/${booking?.image}`} alt="" className="border" />
                                            <h5>{booking.bookedOn}</h5>
                                        </div>
                                        <div className='col-lg-4 d-flex justify-content-center align-items-start flex-column'>
                                            <h5>From:{booking?.bookedFor.startDate}</h5>
                                            <h5>To:{booking?.bookedFor.endDate}</h5>
                                            <h5>booking Status:{booking?.status}</h5>

                                        </div>
                                        <div className='col-lg-4 d-flex justify-content-center align-items-end flex-column'>
                                            <h5>{booking?.ratePerDay} /day</h5>
                                            <h5>total:{booking?.total}</h5>
                                            <h5>Status: {booking?.paymentStatus}</h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="text-center d-flex justify-content-center">
                                        {/* <Button className='btn btn-primary me-5'>Download</Button> */}
                                        <Button onClick={()=>cancelBookings(booking?._id)} className='btn btn-danger'>cancel</Button>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="w-100 text-center">No BOOKINGS YET</div>
                    }

                </div>
                <div className="col-lg-2"></div>
            </div>
            <Footer />
        </div>
    )
}

export default UserBookings