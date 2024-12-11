import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { searchKeyOnVehicleContext } from '../contextApi/ContextShare';
import { isAdminContext } from '../contextApi/AdminAuthContext';

const Header = ({ insideVehicles, insideUserBookings, insideHome, insideView }) => {
    const {isAdminAuthorized,setIsAdminAuthorized} = useContext(isAdminContext)
    const { searchKeyOnvehicle, setSearchKeyOnVehicle } = useContext(searchKeyOnVehicleContext)
    const [isLogined, setIsLogined] = useState(false)
    const navigate = useNavigate()
    console.log(searchKeyOnvehicle);

    useState(() => {
        const token = sessionStorage.getItem("token")
        if (token) {
            setIsLogined(true)
        }
        else {
            setIsLogined(false)
        }
    }, [])
    const handleLogOut = () => {
        sessionStorage.clear()
        navigate('/')
    }
    const user = JSON.parse(sessionStorage.getItem("user"))
    return (
        <div className='bg-dark'>
            <Navbar style={{ height: "135px", zIndex: "1" }} expand="lg" className="bg-dark px-lg-5 container-fluid">
                <Container fluid>
                    <Navbar.Brand><Link style={{ textDecoration: "none" }} to={isAdminAuthorized?'/admin':'/'} className='fs-1 fw-bolder text-light'>Wheels On Demand</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className='text-light bg-light' />
                    <Navbar.Collapse id="navbarScroll" className='bg-dark w-100 rounded p-5'>
                        {/* <Nav className="me-auto my-2 my-lg-0 ms-5"
                            style={{ maxHeight: '100px' }}>
                            {
                                !insideHome &&
                                <Link to={"/"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Home</Link>
                            }
                            {
                                !insideVehicles &&
                                <Link to={isLogined?"/vehicles":"/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Vehicles</Link>
                            }
                            {
                                !insideUserBookings &&
                                <Link to={isLogined?'/user/bookings':"/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning'>Bookings</Link>
                            }
                           
                        </Nav> */}
                        {
                            insideHome &&
                            <Nav className="me-auto my-2 my-lg-0 ms-5">

                                <Link to={isLogined ? "/vehicles" : "/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Vehicles</Link>
                                <Link to={isLogined ? '/user/bookings' : "/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning'>Bookings</Link>
                            </Nav>
                        }
                        {
                            insideVehicles &&
                            <Nav className="me-auto my-2 my-lg-0 ms-5">

                                <Link to={"/"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Home</Link>
                                <Link to={isLogined ? '/user/bookings' : "/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning'>Bookings</Link>
                            </Nav>
                        }
                        {
                            insideUserBookings &&
                            <Nav className="me-auto my-2 my-lg-0 ms-5">

                                <Link to={"/"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Home</Link>
                                <Link to={isLogined ? "/vehicles" : "/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Vehicles</Link>
                                </Nav>
                        }
                        {
                            insideView&&
                            <Nav className="me-auto my-2 my-lg-0 ms-5">

                                <Link to={"/"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Home</Link>
                                <Link to={isLogined ? "/vehicles" : "/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning me-3'>Vehicles</Link>
                                <Link to={isLogined ? '/user/bookings' : "/login"} style={{ textDecoration: "none" }} className='fs-5 text-warning'>Bookings</Link>
                                </Nav>
                        }

                        {
                            insideVehicles &&
                            <Form className="d-flex mb-lg-0 mb-3">
                                <Form.Control
                                    type="search"
                                    placeholder="Search vehicleName"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchKeyOnvehicle}
                                    onChange={(e) => setSearchKeyOnVehicle(e.target.value)}
                                />
                            </Form>
                        }
                        {
                            isLogined ?
                                <NavDropdown className='fs-5 ms-5 btn btn-outline-warning  rounded' title={user ? user.username : User} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                                </NavDropdown>

                                :

                                <NavDropdown className='fs-5 ms-5 btn btn-outline-warning  rounded' title="User" id="collapsible-nav-dropdown">
                                    <NavDropdown.Item onClick={() => navigate('/login')}>Login</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate('/register')}>
                                        Register
                                    </NavDropdown.Item>
                                </NavDropdown>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header