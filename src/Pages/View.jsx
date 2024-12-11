import Footer from "../components/Footer";
import Header from "../components/Header";
import img1 from "../assets/img1.jpg"

import React, { useContext, useEffect, useState } from 'react'
import { TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addBookingToStoreApi, addsalesToStrorageApi, completePickUpApi, completeReturnApi, deleteVehicleApi, getBookingViewApi, getVehicleBookingsApi, getVehicleOnViewApi, updatePaymentStatusOnBookingsApi } from "../Services/allApi";
import serverUrl from "../Services/serverUrl";
import moment from "moment";
import Bookings from "./Bookings";
import { editResponseContext, isPayedContext } from "../contextApi/ContextShare";
import EditVehicle from "../components/editVehicle";


const View = ({ insideAdmin, insideUser, insideBooking }) => {
    const { editResponse, setEditResponse } = useContext(editResponseContext)
    const { isPayed, setIsPayed } = useContext(isPayedContext)
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelate] = useState(false)
    const [isPicked, setIsPicked] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseDelete = () => setShowDelate(false);
    const handleShowDelete = () => setShowDelate(true);
    const [modeOfPayment, setModeOfPayment] = useState('')
    const [bookedForState, setBookedForState] = useState({
        startDate: moment().format('L'),
        endDate: moment().format('L')
    })
    const [vehicleBookedDate, setVehicleBookedDate] = useState({
        startDate: moment().format('L'),
        endDate: moment().format('L')
    })
    const [vehicleDetails, setVehicleDetails] = useState({})
    const [data, setData] = useState({
        name: "",
        phoneNumber: null,
        email: "",
        identification: "",
    })
    const [bookingDetails, setBookingDetails] = useState({})


    // console.log(moment(startDate).isBefore(endDate));

    const params = useParams()
    const vid = params.vid
    useEffect(() => {
        getVehicleDetails()
    }, [editResponse])
    useEffect(() => {
        getBookingsOnView()
    }, [isPayed, setIsPicked])


    console.log(modeOfPayment);



    const total = vehicleDetails.rate * (moment(bookedForState.endDate).diff(moment(bookedForState.startDate), "days") + 1)


    const addBookingToStorage = async () => {
        const { name, phoneNumber, email, identification } = data
        if (name && phoneNumber && email && identification && bookedForState.startDate && bookedForState.endDate) {
            const reqBody = {
                vehicleId: vid,
                registrationNumber: vehicleDetails.registrationNumber,
                Make: vehicleDetails.make,
                Model: vehicleDetails.model,
                name,
                phoneNumber,
                email,
                identification,
                bookedFor: bookedForState,
                image: vehicleDetails.image,
                ratePerDay: vehicleDetails.rate,
                total: total
            }
            const token = sessionStorage.getItem('token')
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await addBookingToStoreApi(reqBody, reqHeader)
                    if (result.status == 200) {
                        alert("booked SuccessFully")
                        setData({
                            name: "",
                            phoneNumber: "",
                            email: "",
                            identification: "",
                        })
                        setBookedForState({
                            startDate: moment().format('L'),
                            endDate: moment().format('L')
                        })
                    } else {
                        alert(result.response.data)
                    }
                } catch (err) {
                    console.log(err);

                }
            } else {
                alert("please Login to continue")
            }
        } else {
            alert("please Fill the form Completely")
        }
    }


    const getVehicleDetails = async () => {
        const token = sessionStorage.getItem("token")

        const vid = params.vid
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getVehicleOnViewApi(vid, reqHeader)
                if (result.status == 200) {
                    setVehicleDetails(result.data)
                }
            } catch (err) {
                console.log(err);

            }
        }
    }
    const getBookingsOnView = async () => {
        const bid = params.bid
        const token = sessionStorage.getItem('token')
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getBookingViewApi(bid, reqHeader)
                if (result.status == 200) {
                    setBookingDetails(result.data)
                    setIsPayed(result.data.paymentStatus ? result.data.paymentStatus : "")
                    setIsPicked(result.data.status)
                }
            } catch (err) {
                console.log(err);

            }
        }
    }
    const updatePaymentStatus = async () => {
        const token = sessionStorage.getItem('token')
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await updatePaymentStatusOnBookingsApi(bookingDetails._id, reqHeader)
                if (result.status == 200) {
                    console.log(result.data);
                    setIsPayed(result)
                    handleClose()
                }
                else {
                    console.log("updation failed");
                }
            } catch (err) {
                console.log(err);

            }

        }
    }

    const addSalesToStorage = async () => {
        const token = sessionStorage.getItem('token')
        const user = JSON.parse(sessionStorage.getItem('user'))
        const reqBody = {
            bookingId: bookingDetails?._id,
            vehicleId: bookingDetails?.vehicleId,
            userId: bookingDetails?.userId,
            userName: bookingDetails?.name,
            userEmail: bookingDetails?.email,
            paidAmound: bookingDetails?.total,
            paymentMode: modeOfPayment
        }

        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await addsalesToStrorageApi(reqBody, reqHeader)
                console.log(result.data);

                if (result.status == 200) {
                    updatePaymentStatus()
                } else {
                    console.log(result.response.data)
                }
            } catch (err) {
                console.log(err);

            }
        }
    }
    const completePickUp = async () => {
        const token = sessionStorage.getItem('token')
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await completePickUpApi(bookingDetails._id, reqHeader)
                if (result.status == 200) {
                    setIsPicked(result.data.status)
                    getBookingsOnView()
                } else {
                    alert("failed to mark pickUp");

                }
            } catch (err) {
                console.log(err);

            }
        }
    }
    const completeReturn = async () => {
        const token = sessionStorage.getItem('token')
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await completeReturnApi(bookingDetails._id, reqHeader)
                if (result.status == 200) {
                    setIsPicked(result.data.status)
                    getBookingsOnView()
                    navigate('/bookings')
                } else {
                    alert("failed to mark pickUp");

                }
            } catch (err) {
                console.log(err);

            }
        }
    }
    const deleteVehicle = async () => {
        const token = sessionStorage.getItem("token")
        const user = JSON.parse(sessionStorage.getItem("user"))
        const vid = params.vid
        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await deleteVehicleApi(vid, reqHeader)
                if (result.status == 200) {
                    console.log(result.data);
                    navigate('/garage')
                }
            } catch (err) {
                console.log(err);

            }
        }

    }


    return (
        <>
            <Header insideView={true}/>
            <div style={{ height: "100%" }} className="w-100 p-5 d-flex justify-content-center align-items-center">
                <div className=" rounded flex-coloumn d-flex justify-content-center align-items-center">
                    <div className="row g-5">
                        <div className="col-lg-6 p-3">
                            <h1>{vehicleDetails?.model}</h1>
                            <hr />
                            <div style={{ position: "relative" }} className="w-100">
                                <img className="rounded" width={"100%"} height={"350px"} src={`${serverUrl}/uploads/${vehicleDetails.image}`} alt="" />
                                <div style={{ position: "absolute", bottom: "10px", right: "10px", width: "30%", height: "30%" }} className="rounded auth-glass d-flex text-light justify-content-center align-items-center">
                                    <h3>{vehicleDetails.rate} Rs/day</h3>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col-lg-6">
                                    <h3>Make:{vehicleDetails.make}</h3>
                                </div>
                                <div className="col-lg-6"><h4>Year:{vehicleDetails.yearOfRegistration}</h4>
                                </div>
                                <div className="col-lg-6"><h4>Transmission:{vehicleDetails.transmission}    </h4>
                                </div>
                                <div className="col-6 lg"><h4>Fuel Type:{vehicleDetails.fuelType}</h4></div>
                            </div>

                        </div>
                        {
                            insideAdmin &&
                            <div className="col-lg-6 p-3">
                                <h1>All Details</h1>
                                <hr />
                                <h3 className="mb-5">Status:<span className={vehicleDetails.status == "available" ? "text-success" : "text-danger"}>{vehicleDetails.status}</span></h3>
                                <h3 className="mb-5">Total Bookings:</h3>
                                <h3 className="mb-5">Last Booked</h3>
                                <h3 className="mb-5">Service Date</h3>
                                <h3 className="mb-5">Quality:High</h3>
                                <div className=" w-100 d-flex justify-content-center align-items-center mb-3 p-2">
                                    <EditVehicle data={vehicleDetails} />
                                    <Button onClick={handleShowDelete} className="btn btn-success ms-5">Remove Vehicle</Button>
                                </div>
                            </div>
                        }
                        <Modal show={showDelete} onHide={handleCloseDelete} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are You sure Want to delete?.....</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDelete}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={deleteVehicle}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        {
                            insideUser &&
                            <div className="col-lg-6 p-3">
                                <h1>Book Now</h1>
                                <hr />
                                <form>
                                    <div className="div d-flex justify-content-evenly align-items-center mb-3">
                                        <TextField value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} label="Full Name" variant="outlined" />
                                        <TextField value={data.phoneNumber} onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} label="Phone" variant="outlined" />
                                    </div>
                                    <div className="div d-flex justify-content-center align-items-center mb-3">
                                        <TextField value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" className="w-75" label="Email" variant="outlined" />
                                    </div>
                                    <div className=" d-flex justify-content-evenly align-items-center mb-5">
                                        <label>
                                            <h6>Book From</h6>
                                            <DatePicker selected={bookedForState.startDate} onChange={(date) => setBookedForState({ ...bookedForState, startDate: moment(date).format('L') })} />
                                        </label>
                                        <label>
                                            <h6> To</h6>
                                            <DatePicker selected={bookedForState.endDate} onChange={(date) => setBookedForState({ ...bookedForState, endDate: moment(date).format('L') })} />
                                        </label>

                                    </div>
                                    <div className="div d-flex justify-content-center align-items-center mb-3">
                                        <TextField value={data.identification} onChange={(e) => setData({ ...data, identification: e.target.value })} type="text" className="w-75" label="Aadhar/Drivers license" variant="outlined" />
                                    </div>
                                    <div className="div d-flex justify-content-center align-items-center mb-3">
                                        <h2>Total:{total ? total : data.rate} Rs</h2>
                                    </div>
                                    <div className=" w-100 d-flex justify-content-center align-items-center mb-3 p-2">
                                        <Button onClick={()=>setData({
                                            name: "",
                                            phoneNumber: "",
                                            email: "",
                                            identification: "",
                                        })} className="btn btn-warning">Reset</Button>
                                        <Button onClick={addBookingToStorage} className="btn btn-success ms-5">Proceed</Button>
                                    </div>

                                </form>
                            </div>
                        }
                        {
                            insideBooking &&
                            <div className="col-lg-6 p-2">
                                <div className="d-flex justify-content-between align-items-end position-relative">
                                    <h1>Booking Details</h1>
                                </div>
                                <hr />
                                <h3>Booking Id: <span className="text-warning mb-3">{bookingDetails?._id}</span></h3>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">User Id</h3>
                                    <h3 className="float-end">{bookingDetails.userId}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">Vehicle ID</h3>
                                    <h3 className="float-end">{bookingDetails.vehicleId}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">Booked On</h3>
                                    <h3 className="float-end">{bookingDetails.bookedOn}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">REG Number</h3>
                                    <h3 className="float-end">{bookingDetails.registrationNumber}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">Payment Status</h3>
                                    <h3 className="float-end">{bookingDetails?.paymentStatus}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">BookedFor</h3>
                                    <h3 className="float-end">{bookingDetails?.bookedFor?.startDate}-{bookingDetails?.bookedFor?.startDate}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">Status</h3>
                                    <h3 className="float-end">{bookingDetails?.status}</h3>
                                </div>
                                <div className="d-flex w-100 justify-content-between mb-4">
                                    <h3 className="text-success">Total Amount</h3>
                                    <h3 className="float-end">{bookingDetails?.total} Rs</h3>
                                </div>
                                <div className=" w-100 d-flex justify-content-between align-items-center mb-3 p-2">
                                    {/* <Button className="btn btn-warning">Not Picked</Button> */}
                                    {
                                        isPicked == "picked" ?
                                            <Button onClick={completeReturn} className="btn btn-success ms-5">complete return</Button>
                                            :
                                            isPayed == "pending" ?
                                                <Button onClick={handleShow} className="btn btn-success ms-5">Proceed Payment</Button>
                                                :
                                                isPicked!="completed"&&
                                                <Button onClick={completePickUp} className="btn btn-success ms-5">Complete PickUp</Button>
                                                
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-bolder">Complete Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>BId: <span className="text-warning mb-3">{bookingDetails?._id}</span></h3>
                        <div className="d-flex w-100 justify-content-between mb-4">
                            <h3 className="text-success">User Id</h3>
                            <h3 className="float-end">{bookingDetails.userId}</h3>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-4">
                            <h3 className="text-success">REG Number</h3>
                            <h3 className="float-end">{bookingDetails.registrationNumber}</h3>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-4">
                            <h3 className="text-success">email</h3>
                            <h3 className="float-end">{bookingDetails?.email}</h3>
                        </div>
                        <div className="d-flex w-100 justify-content-between mb-4">
                            <h3 className="text-success">Total Amount</h3>
                            <h3 className="float-end">{bookingDetails?.total} Rs</h3>
                        </div>
                        <hr />
                        <div className="w-100 my-5">
                            <h3>PaYment Mode</h3>
                            <Form.Select onChange={(e) => setModeOfPayment(e.target.value)} aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="card">Credit/Debit Card</option>
                                <option value="upi">UPI transaction</option>
                                <option value="cash">Cash</option>
                            </Form.Select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={addSalesToStorage} variant="primary">Complete Payment</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Footer />
        </>
    )
}

export default View