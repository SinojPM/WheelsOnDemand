import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import VehicleCard from '../components/VehicleCard'
import { Button, TextField } from '@mui/material'
import AddVehicle from '../components/Addvehicle'
import { getAllVehiclesApi, getAllVehiclesOnGarageApi } from '../Services/allApi'
import { addResponseContext } from '../contextApi/ContextShare'

const Garage = () => {
    const [adminVehicles,setAdminVehicles] = useState([])
    const {addResponse,setAddResponse} = useContext(addResponseContext)
    const [searchKey, setSearchKey] = useState('')
    const [allVehicles, setAllVehicles] = useState([])
    useEffect(() => {
        handleGetAllVehicles()
    }, [searchKey,addResponse])
    useEffect(()=>{
        getAllvehicles()
    },[])
    const getAllvehicles = async ()=>{
        const token = sessionStorage.getItem("token")
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllVehiclesApi(reqHeader)
                if(result.status==200){
                    setAdminVehicles(result.data)
                console.log(adminVehicles);
                }

            } catch (err) {
                alert(err)
            }
        } else {
            alert("please login")
        }
    }
    const handleGetAllVehicles = async () => {
        const token = sessionStorage.getItem("token")
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllVehiclesOnGarageApi(searchKey, reqHeader)
                if(result.status==200){
                    setAllVehicles(result.data)
                console.log(allVehicles);
                }

            } catch (err) {
                alert(err)
            }
        } else {
            alert("please login")
        }
    }

    return (
        <div className='admin-wrapper'>
            <div className="admin-glass">
                <Sidebar inside={"garage"} />
                <div>
                    <div className="d-flex justify-content-between mt-5 bookings-heading">
                        <h1 style={{ zIndex: 1 }}>Garage</h1>
                        <div className="d-flex">
                            <TextField value={searchKey} onChange={(e) => setSearchKey(e.target.value)} id="outlined-basic" label="Register Number" variant="outlined" />
                            <Button color="success" variant='contained' className='ms-3'>Search</Button>
                        </div>
                        <AddVehicle />
                    </div>
                    <hr />
                    <div className="row p-5 g-5">
                        {
                            allVehicles?.map(vehicle => (
                                <div key={vehicle.registrationNumber} className="col-lg-3">
                                    <VehicleCard vehicle={vehicle} insideGarage={true}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* <div style={{ borderLeft: "solid 1px green", height: "100vh" }} className='w-100 d-flex flex-column justify-content-evenly align-items-center ms-3 my-5'>
                    <div style={{ height: "150px" }} className="w-75 text-center border rounded shadow bg-dark p-4">
                        <h4 className=' text-light'>Total Vehicles</h4>
                        <hr />
                        <h2 className='text-warning'>{adminVehicles.length}</h2>
                    </div>
                    <div style={{ height: "150px" }} className="w-75 text-center border rounded shadow bg-dark p-4">
                        <h4 className=' text-light'>Booked</h4>
                        <hr />
                        <h2 className='text-warning'>{adminVehicles.filter(vehicle=>vehicle.status!="available").length}</h2>
                    </div>
                    <div style={{ height: "150px" }} className="w-75 text-center border rounded shadow bg-dark p-4">
                        <h4 className=' text-light'>Available</h4>
                        <hr />
                        <h2 className='text-warning'>{adminVehicles.filter(vehicle=>vehicle.status=="available").length}</h2>
                    </div>
                </div> */}
                <div>

                </div>
            </div>
        </div>
    )
}

export default Garage
