import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, Dropdown } from 'react-bootstrap'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import VehicleCard from '../components/VehicleCard'
import Footer from '../components/Footer'
import Slider from '../components/slider/Slider'
import { getAllVehiclesForUserApi, getRecentViewsApi } from '../Services/allApi'
import { searchKeyOnVehicleContext } from '../contextApi/ContextShare'


const OPTIONS = { align: 'start', loop: true }

const Vehicles = () => {
    const {searchKeyOnvehicle,setSearchKeyOnVehicle} = useContext(searchKeyOnVehicleContext)
    const [searchKey, setSearchKey] = useState('')
    const [recentViews,setRecentviews] = useState([])
    const [allVehicles, setAllVehicles] = useState([])
    useEffect(() => {
        handleGetAllVehicles()
    }, [searchKeyOnvehicle])
    useEffect(()=>{
        getRecentViews()
    },[])
    console.log(recentViews);
    console.log(allVehicles);
    const handleGetAllVehicles = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAllVehiclesForUserApi(searchKeyOnvehicle, reqHeader)
                if (result.status == 200) {
                    setAllVehicles(result.data)
                }

            } catch (err) {
                alert(err)
            }
        } else {
            alert("please login")
        }
    }
    const getRecentViews = async ()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await getRecentViewsApi(reqHeader)
            if(result.status == 200){
                setRecentviews(result.data)
            }
        }
    }
    return (
        <>
            <Header insideVehicles={true} />
            <div style={{ width: "100%" }} className=' d-flex vehicle-wrapper flex-column justify-content-between align-items-center'>
                <div className="mt-5 p-5 row w-100">
                    <div className="col-lg-9 d-flex flex-column justify-content-center">
                        <h1 className='text-left'>All</h1>
                        <hr />
                        <div className="w-100 p-3 vehicle-glass border rounded row g-5 mt-3">
                            {
                                allVehicles.length > 0 ?
                                    allVehicles.map(vehicle => (
                                        <div key={vehicle._id} className="col-lg-4 col-12 d-flex justify-content-center align-items-center">
                                            <VehicleCard vehicle={vehicle} />
                                        </div>
                                    ))

                                    :
                                    <div className="text-center text-danger">No VehiCle to display</div>
                            }
                        </div>
                        <h1 className='text-left mt-5'>Recently Viewed</h1>
                        <hr />
                        <div className="w-100">
                            <Slider slides={recentViews} options={OPTIONS} />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h1>Quick Links</h1>
                        <hr />
                        <div style={{ position: "sticky", top: "0" }} className="w-100 p-3 vehicle-glass border shadow d-flex justify-content-center align-items-center flex-lg-column rounded">
                            <Link className='m-3' to={'/'}>Home</Link>
                            <Link className='m-3' to={'/user/bookings'}>Bookings</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Vehicles