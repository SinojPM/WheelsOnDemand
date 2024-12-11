import { useContext, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Auth from './Pages/Auth'
import Bookings from './Pages/Bookings'
import Garage from './Pages/Garage'
import Users from './Pages/Users'
import Vehicles from './Pages/Vehicles'
import View from './Pages/View'
import UserBookings from './Pages/UserBookings'
import { isUserContext } from './contextApi/UserAuthContext'
import { isAdminContext } from './contextApi/AdminAuthContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";






function App() {
  const [count, setCount] = useState(0)
  const {isUserAuthorized,setIsUserAuthorized} = useContext(isUserContext)
  const {isAdminAuthorized,setIsAdminAuthorized} = useContext(isAdminContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/admin' element={isAdminAuthorized?<Admin/>:<Auth/>}></Route>
        <Route path='/bookings' element={isAdminAuthorized?<Bookings/>:<Auth/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth insideRegister={true}/>}></Route>
        <Route path='/garage' element={isAdminAuthorized?<Garage/>:<Auth/>}></Route>
        <Route path='/users' element={isAdminAuthorized?<Users/>:<Auth/>}></Route>
        <Route path='/vehicles' element={isUserAuthorized?<Vehicles loggedIn={true}/>:<Auth/>}></Route>
        <Route path='/:vid/view' element={isUserAuthorized?<View insideUser={true}/>:<Auth/>}></Route>
        <Route path='admin/:vid/view' element={isAdminAuthorized?<View insideAdmin={true}/>:<Auth/>}></Route>
        <Route path='/user/bookings' element={isUserAuthorized?<UserBookings/>:<Auth/>}></Route>
        <Route path='/bookings/:vid/:bid/view' element={isAdminAuthorized?<View insideBooking={true}/>:<Auth/>}></Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
