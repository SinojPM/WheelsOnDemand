import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashbordCard from '../components/DashbordCard'
import { getDashboardBookingsApi, getSalesApi, getUsersOnDashBoardApi } from '../Services/allApi'
import moment from 'moment'
import { BorderLeftRounded } from '@mui/icons-material'
import { toast } from 'react-toastify'

const Admin = () => {
  const [allBookings, setAllBookings] = useState([])
  const [date, setDate] = useState(new Date().toLocaleDateString())
  const [users, setUsers] = useState([])
  const [sales, setSales] = useState([])
  useEffect(() => {
    getUsers()
  }, [])
  useEffect(() => {
    getAllBookings()
  }, [])
  useEffect(() => {
    getSales()
  }, [])
   const todaysUser = users.filter(item => item.joiningDate == new Date().toLocaleDateString())
  
  const todaysBooking = allBookings.filter(item => moment(item.bookedOn).format('L') == moment().format('L'))
  
  
  
  const getSum = (total,num)=>{
    return total+num
  }
  const totalSales = sales.map((item)=>item.paidAmound).reduce(getSum,0)
  const todaysSale = sales.filter(item => item.paymentDate == date).map(item=>item.paidAmound).reduce(getSum,0)
  const getAllBookings = async () => {
    const token = sessionStorage.getItem("token")
    const user = JSON.parse(sessionStorage.getItem("user"))

    if (token && user.role == "admin") {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getDashboardBookingsApi(reqHeader)
        if (result.status == 200) {
          setAllBookings(result.data)

        } else {
          alert(req.response.data)
        }
      } catch (err) {
        console.log(err);

      }
    } else {
      toast.warning("please Login",{
        autoClose:2000,
        position:"top-center"
      })
    }
  }

  const getUsers = async () => {
    const token = sessionStorage.getItem('token')
    const user = JSON.parse(sessionStorage.getItem("user"))
    if (token && user.role == "admin") {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getUsersOnDashBoardApi(reqHeader)
        if (result.status == 200) {
          setUsers(result.data)


        }
      } catch (err) {

        console.log(err);

      }
    } else {
      toast.warning("please Login to continue",{
        autoClose:2000,
        position:"top-center"
      })
    }
  }

  const getSales = async () => {
    const token = sessionStorage.getItem('token')
    const user = JSON.parse(sessionStorage.getItem("user"))
    if (token && user.role == "admin") {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getSalesApi(reqHeader)
        if (result.status == 200) {
          setSales(result.data)
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("please Login to continue",{
        autoClose:2000,
        position:"top-center"
      })
    }
  }


  return (
    <div className='admin-wrapper'>
      <div className="admin-glass">
        <Sidebar inside={"admin"} />
        <div className="admin-sec2 px-lg-5 px-3">
          <h1 className='fw-bolder mt-5'>Dashboard</h1>
          <hr />
          <div className='row mb-5 g-5'>
            <div className="col">
              <DashbordCard background={"linear-gradient(180deg,#BB67FF 0%,#C484F3 100%)"} today={todaysUser?.length} total={users.length - 1} heading={"Users"} />
            </div>
            <div className="col">
              <DashbordCard background={"linear-gradient(rgb(248,212,154) -146%,rgb(255,202,113) -46%)"} today={todaysBooking?.length} total={allBookings?.length} heading={"Bookings"} />
            </div>
            <div className="col">
              <DashbordCard today={todaysSale} total={totalSales} background={"linear-gradient(180deg,#FF919D 0%,#FC929D 100%)"} heading={"Sales"} />
            </div>
          </div>
          <div className="my3 admin-sec3">
            <h1>New Bookings</h1>
            <hr />
            <div className='table-wrapper'>
              <table className="table table-striped table-success text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>user</th>
                    <th>Booking Id</th>
                    <th>Booking Date</th>
                    <th>Booked For</th>
                    <th>Vehicle Id</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    todaysBooking.length > 0 ?
                      todaysBooking.map((item, index) => (
                        <tr>
                          <td key={item._id}>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item._id}</td>
                          <td>{moment(item.bookedOn).format('L')}</td>
                          <td>{item.bookedFor.startDate}-{item.bookedFor.endDate}</td>
                          <td>{item.vehicleId}</td>
                        </tr>
                      ))
                      : <div className="text-CenterFocusStrong text-Dangerous fw-Border">No Bookings Today</div>
                  }

                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Admin