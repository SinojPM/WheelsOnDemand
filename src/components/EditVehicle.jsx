import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import img1 from '../assets/img1.jpg'
import { TextField } from '@mui/material'
import uploadImg from '../assets/Upload-Icon-Logo-PNG-Clipart-Background.png'
import {  editVehicleApi } from '../Services/allApi'
import { addResponseContext, editResponseContext } from '../contextApi/ContextShare'
import serverUrl from '../Services/serverUrl'

const EditVehicle = ({ data }) => {
    const {editResponse,setEditResponse} = useContext(editResponseContext)
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [imgFileStatus, setImgFileStatus] = useState(false)
    const [vehicleData, setVehicleData] = useState({
        id:data?._id,
        model: data.model,
        make: data.make,
        yearOfRegistration: data.yearOfRegistration,
        registrationNumber: data.registrationNumber,
        transmission: data.transmission,
        fuelType: data.fuelType,
        rate: data.rate,
        condition: data.condition,
        image: ""
    })
    useEffect(() => {
        if (vehicleData.image.type == "image/png" || vehicleData.image.type == "image/jpg" || vehicleData.image.type == "image/jpeg") {
            setImgFileStatus(true)
            setPreview(URL.createObjectURL(vehicleData.image))
        } else {
            setImgFileStatus(false)
            setPreview("")
            setVehicleData({ ...vehicleData, image: "" })
        }
    }, [vehicleData.image])
    console.log(data);
    console.log(vehicleData);



    const handleClose = () => {
        setVehicleData({
            id:data?._id,
            model: data?.model,
            make: data?.make,
            yearOfRegistration: data?.yearOfRegistration,
            registrationNumber: data?.registrationNumber,
            transmission: data?.transmission,
            fuelType: data?.fuelType,
            rate: data?.rate,
            condition: data?.condition,
            image: ""
        })
        setShow(false);
    }
    const handleShow = () => {
        setVehicleData({
            id:data?._id,
            model: data?.model,
            make: data?.make,
            yearOfRegistration: data?.yearOfRegistration,
            registrationNumber: data?.registrationNumber,
            transmission: data?.transmission,
            fuelType: data?.fuelType,
            rate: data?.rate,
            condition: data?.condition,
            image: ""
        })
        setShow(true);
    }




    const handleEditVehicle = async (data) => {
        const { model, make, yearOfRegistration, registrationNumber, transmission, fuelType, rate, condition, image ,id} = vehicleData
        if (model && make && yearOfRegistration && registrationNumber && transmission && fuelType && rate && condition) {
            const reqBody = new FormData()
            reqBody.append("model", model)
            reqBody.append("make", make)
            reqBody.append("yearOfRegistration", yearOfRegistration)
            reqBody.append("registrationNumber", registrationNumber)
            reqBody.append("transmission", transmission)
            reqBody.append("fuelType", fuelType)
            reqBody.append("rate", rate)
            reqBody.append("condition", condition)
            preview?reqBody.append("image", image): reqBody.append("image",data.image)
            console.log(preview);
            
            const token = sessionStorage.getItem("token")
            const user = JSON.parse(sessionStorage.getItem("user"))
            console.log(token, user);

            if (token && user.role == "admin") {
                const reqHeader = {
                    "Content-Type": preview ? "multipart/form-data" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await editVehicleApi(id,reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        handleClose()
                        setEditResponse(result)
                        setVehicleData({
                            model: data?.model,
                            make: data?.make,
                            yearOfRegistration: data?.yearOfRegistration,
                            registrationNumber: data?.registrationNumber,
                            transmission: data?.transmission,
                            fuelType: data?.fuelType,
                            rate: data?.rate,
                            condition: data?.condition,
                            image: ""
                        })
                    } else {
                        alert(result.response.data)

                    }

                } catch (err) {
                    console.log(err);

                }
            } else {
                alert('no token')
            }
        } else {
            alert('please fill the form completely')
        }

    }
    return (
        <>
            <Button style={{ width: "100px", height: "55px" }} variant="outline-danger" onClick={() => handleShow()}>
                Edit
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton className='bg-warning'>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-3">
                            <label className='w-100'>
                                <input style={{ display: 'none' }} type="file" onChange={e => setVehicleData({ ...vehicleData, image: e.target.files[0] })} />
                                <img height={"150px"} width={"100%"} src={preview?preview:`${serverUrl}/uploads/${data?.image}`} alt="" />
                            </label>
                            {
                                !imgFileStatus &&
                                <div className="text-warning fw-bolder my-2">
                                    *upload Only the Following file Types (Jpeg,jpg,png) here,
                                </div>
                            }
                            <div className='my-2'>
                                <TextField value={vehicleData.model} onChange={e => setVehicleData({ ...vehicleData, model: e.target.value })} className='w-100' id="filled-basic" label="Model" variant="filled" />
                            </div>
                            <div className='mb-2'>
                                <TextField value={vehicleData.make} onChange={e => setVehicleData({ ...vehicleData, make: e.target.value })} className='w-100' id="outlined-basic" label="Make" variant="filled" />
                            </div>
                        </div>
                        <div className="col-lg-6 mt-sm-3">
                            <div className='mb-2'>
                                <TextField value={vehicleData.yearOfRegistration} onChange={e => setVehicleData({ ...vehicleData, yearOfRegistration: e.target.value })} className='w-100' id="filled-basic" label="Year of Registration" variant="filled" />
                            </div>
                            <div className='mb-2'>
                                <TextField value={vehicleData.transmission} onChange={e => setVehicleData({ ...vehicleData, transmission: e.target.value })} className='w-100' id="outlined-basic" label="Transmission" variant="filled" />
                            </div>
                            <div className='mb-2'>
                                <TextField value={vehicleData.fuelType} onChange={e => setVehicleData({ ...vehicleData, fuelType: e.target.value })} className='w-100' id="filled-basic" label="Fuel-Type" variant="filled" />
                            </div>
                            <div className='mb-2'>
                                <TextField value={vehicleData.rate} onChange={e => setVehicleData({ ...vehicleData, rate: Number(e.target.value) })} className='w-100' id="filled-basic" label="Rate" variant="filled" />
                            </div>
                            <div className='mb-2'>
                                <TextField value={vehicleData.registrationNumber} onChange={e => setVehicleData({ ...vehicleData, registrationNumber: e.target.value })} className='w-100' id="filled-basic" label="Regisgtration No" variant="filled" />
                            </div>

                            <div className='mb-2'>
                                <TextField value={vehicleData.condition} onChange={e => setVehicleData({ ...vehicleData, condition: e.target.value })} className='w-100' id="filled-basic" label="Condition" variant="filled" />
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button  onClick={()=>handleEditVehicle(data)}  variant="primary">add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditVehicle