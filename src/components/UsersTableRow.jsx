import React, { useContext, useEffect, useState } from 'react'
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getUserBookingsOnAdminApi } from '../Services/allApi';
import { searchResponseOnAdminContext } from '../contextApi/ContextShare';
const UsersTableRow = ({user}) => {
    const {searchResponseOnAdmin,setSearchResponseOnAdmin} = useContext(searchResponseOnAdminContext)
    const [open, setOpen] = useState(false)
    const [userBookings,setUserBookings] = useState([])
    useEffect(()=>{
        getUserBookings()
    },[searchResponseOnAdmin])

   
    const getUserBookings = async () => {
        
        console.log(user);
        const token = sessionStorage.getItem("token")
        const userData = JSON.parse(sessionStorage.getItem("user"))
        console.log(token);
        
        console.log(userData);
        
        const searchKey = user._id
        
        
        if (token && userData.role=="admin") {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getUserBookingsOnAdminApi(searchKey,reqHeader)
                if (result.status == 200) {
                    setUserBookings(result.data)
                    console.log(userBookings); 
                } else {
                    console.log(result.response.data)
                }
            } catch (err) {
                console.log(err);

            }
        }
    }
    return (
        <TableBody>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className='bg-warning'>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {user.username}
                </TableCell>
                <TableCell align="right">{user._id}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.joiningDate}</TableCell>
            </TableRow>
            <TableRow className='bg-light'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Vehicle</TableCell>
                                        <TableCell align="right">Payment Status</TableCell>
                                        <TableCell align="right">Total price</TableCell>
                                        <TableCell align="right">status</TableCell>
                                    </TableRow>
                                </TableHead>
                                {
                                    userBookings.map((item)=>(
                                        <TableBody>
                                <TableRow>
                                        <TableCell>{item.bookedOn}</TableCell>
                                        <TableCell>{item.Make}-{item.Model}</TableCell>
                                        <TableCell align="right">{item.paymentStatus}</TableCell>
                                        <TableCell align="right">{item.total}</TableCell>
                                        <TableCell align="right">{item.status}</TableCell>
                                    </TableRow>
                                </TableBody>
                                    ))
                                }
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

export default UsersTableRow