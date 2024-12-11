import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import BookingsCard from '../components/BookingsCard'
import { Button, TextField } from '@mui/material'
import { getAdminBookingsApi } from '../Services/allApi'

const Bookings = () => {
    const [allBookings, setAllBookings] = useState([])
    const [searchKey,setSearchKey] = useState("")
    useEffect(() => {
        getAllBookings()
    }, [searchKey])
    const getAllBookings = async () => {
        const token = sessionStorage.getItem("token")
        const user = JSON.parse(sessionStorage.getItem("user"))

        if (token && user.role == "admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getAdminBookingsApi(searchKey,reqHeader)
                if (result.status == 200) {
                    setAllBookings(result.data)
                    console.log(allBookings);
                }
            } catch (err) {
                console.log(err);

            }
        } else {
            alert("please Login")
        }
    }
    return (
        <div className='admin-wrapper'>
            <div className="admin-glass">
                <Sidebar inside={"bookings"} />
                <div>
                    <div className="d-flex justify-content-between mt-5 bookings-heading px-lg-5">
                        <h1 style={{ zIndex: 1 }}>Bookings</h1>
                        <div className="d-flex">
                            <TextField value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} id="outlined-basic" label="Search name" variant="outlined" />
                        </div>
                    </div>
                    <hr />
                    <div className="row px-5 g-5">
                        {
                            allBookings?.length > 0 ?
                                allBookings?.toReversed().map((item) => (
                                    <div key={item._id} className="col-lg-3 col-md-6 col-12 d-flex justify-content-center">
                                        <BookingsCard data={item}/>
                                    </div>
                                ))
                                :
                                <div className="text-center text-danger">No Bookings Yet</div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookings