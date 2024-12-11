import React, { useEffect, useState } from 'react'
import Logo from '../assets/react.svg'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


const Sidebar = ({inside}) => {
    const [expanded,setExpanded] = useState(false)
    const handleLogOut = ()=>{
        sessionStorage.clear()
        navigate('/')
    }
    const [selected, setSelected] = useState(inside)
    const navigate = useNavigate()
    useEffect(()=>{
        if(window.innerWidth<767){
            setExpanded(true)
        }else{
            setExpanded(false)
        }
    },[])
    return (
        <div style={{position:"relative"}}>
            <div onClick={()=>setExpanded(!expanded)} style={{position:"fixed",top:"20px",left:"50px",zIndex:"5"}}className='p-1 bg-warning rounded-circle d-lg-none'>
                <MenuOpenIcon/>
            </div>
            <div className='sidebar' style={expanded?{display:"none"}:{display:"block"}}>
                <div onClick={()=>{navigate("/")}} className="logo">
                    <CarRentalIcon />
                    <span>WOD</span>
                </div>
                <div className="sidebar-menu">
                    <Link to={"/admin"}  style={{ textDecoration: "none" }} className={selected === "admin" ? "sidebar-menuItem active" : "sidebar-menuItem"} onClick={() => setSelected("admin")}>
                        <div>
                            <SpaceDashboardIcon />
                        </div>
                        <span>Dashboard</span>
                    </Link>
                    <Link to={"/bookings"} style={{ textDecoration: "none" }} className={selected === "bookings" ? "sidebar-menuItem active" : "sidebar-menuItem"} onClick={() => setSelected("bookings")}>
                        <div>
                            <NoCrashIcon />
                        </div>
                        <span>Bookings</span>
                    </Link>
                    <Link to={"/users"} style={{ textDecoration: "none" }} className={selected === "users" ? "sidebar-menuItem active" : "sidebar-menuItem"} onClick={() => setSelected("users")}>
                        <div>
                            <PeopleAltIcon />
                        </div>
                        <span>Users</span>
                    </Link>
                    <Link to={"/garage"} style={{ textDecoration: "none" }} className={selected === "garage" ? "sidebar-menuItem active" : "sidebar-menuItem"} onClick={() => setSelected("garage")}>
                        <div>
                            <DriveEtaIcon />
                        </div>
                        <span>Garage</span>
                    </Link>
                    <div className="sidebar-menuItem">
                        <div>
                            <LogoutIcon />
                        </div>
                        <span onClick={handleLogOut}>
                            Logout
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar