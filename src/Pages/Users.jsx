import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Button, TextField } from '@mui/material'
import { getAllUsersWithSearchApi } from '../Services/allApi';
import UsersTableRow from '../components/UsersTableRow';
import { registerResponseContext, searchResponseOnAdminContext } from '../contextApi/ContextShare';

const Users = () => {
    const {registerResponse,setRegisterResponse} = useContext(registerResponseContext)
    const {searchResponseOnAdmin,setSearchResponseOnAdmin} = useContext(searchResponseOnAdminContext)
    const [AllUsersWithSearch, setAllUsersWithSearch] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    useEffect(() => {
        getAllUsersWithSearch()
        
    }, [searchKey,registerResponse])
    const getAllUsersWithSearch = async () => {
        const token = sessionStorage.getItem("token")
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (token && user.role == "admin") {
            try {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const result = await getAllUsersWithSearchApi(searchKey, reqHeader)
                setAllUsersWithSearch(result.data)
                console.log(AllUsersWithSearch);
                setSearchResponseOnAdmin(result)

            } catch (err) {
                console.log(err);
            }
        } else {
            alert('please Login to Proceed')
        }
    }
    return (
        <div className='admin-wrapper'>
            <div className="admin-glass">
                <Sidebar inside={"users"} />
                <div className='px-5'>
                    <div className="d-flex justify-content-between mt-5 bookings-heading">
                        <h1 style={{ zIndex: 1 }}>Users</h1>
                        <div className="d-flex">
                            <TextField value={searchKey} onChange={(e) => setSearchKey(e.target.value)} id="outlined-basic" label="Booking Id" variant="outlined" />
                            <Button color="success" variant='contained' className='ms-3'>Username</Button>
                        </div>
                    </div>
                    <hr />
                    <TableContainer component={Paper} className='bg-success'>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Id</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Join Date</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                AllUsersWithSearch.length > 0 ?
                                    AllUsersWithSearch.filter(user=>user.role!="admin").map((user,index) => (
                                      <UsersTableRow user={user}/>
                                    ))
                                    :
                                    <TableRow>No Users To Display</TableRow>
                            }
                        </Table>
                    </TableContainer>
                </div>
                {/* <div style={{ borderLeft: "solid 1px green", height: "100vh" }} className='w-100 d-flex flex-column justify-content-evenly align-items-center ms-3 my-5'>
                    <div style={{ height: "150px" }} className="w-75 text-center border rounded shadow bg-dark p-4">
                        <h4 className=' text-light'>Total Vehicles</h4>
                        <hr />
                        <h2>15</h2>
                    </div>
                    <div style={{ height: "150px" }} className="w-75 text-center border rounded shadow bg-dark p-4">
                        <h4 className=' text-light'>Booked</h4>
                        <hr />
                        <h2>15</h2>
                    </div>
                    <div style={{ height: "150px" }} className="w-75 text-center border rounded shadow bg-dark p-4">
                        <h4 className=' text-light'>Available</h4>
                        <hr />
                        <h2>15</h2>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Users