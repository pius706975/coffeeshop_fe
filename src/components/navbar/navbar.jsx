import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './navbar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import brandLogo from './images/navbrand.png'
import { useNavigate } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../utils/api";
import { Dropdown, Image } from "react-bootstrap";
import { logout } from "../../store/reducer/user";

function NavbarComp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api  = Api()
    const {isAuth} = useSelector((state)=>state.users)
    const [user, setUsers] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const getUser = ()=>{
        api.requests({
            method: 'GET',
            url: '/user/profile'
        }).then((res)=>{
            const data = res.data
            setUsers(data)
            if (data.role_data.name === 'Admin' || data.role_data.name === 'admin' || data.role_data.id === 2) {
                setIsAdmin(true)
            }
            // console.log(data);
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    useEffect(()=>{
        if (isAuth) getUser()
    }, [isAuth])
    
    const toSignUpPage = ()=>{
        navigate('/signup')
    }

    const toSignInPage = ()=>{
        navigate('/signin')
    }

    return (
        <div className="nav-app">
            <Navbar expand="md" fixed="top" id="navbar">
                <Navbar.Brand href="/" className="fs-3 ms-3"><b><img src={brandLogo} width={70} alt="brand" /></b></Navbar.Brand>
                
                <Navbar.Toggle aria-controls="navbarCollapse" className="me-3">
                    <HiBars3BottomRight color="white" size={30} className="icon-no-border"/>
                </Navbar.Toggle>

                <Navbar.Collapse id="navbarCollapse">
    
                    <Nav className="ms-auto drop">
                        <Nav.Link href="/" className="nav-link mx-3 nav-item">Home</Nav.Link>
                        <Nav.Link href="/menu" className="nav-link mx-3 nav-item">Menu</Nav.Link>
                        <Nav.Link href="#" className="nav-link mx-3 nav-item">Services</Nav.Link>
                        <Nav.Link href="#" className="nav-link mx-3 nav-item">About</Nav.Link>
                        <Nav.Link href="#" className="nav-link mx-3 nav-item">Contact Us</Nav.Link>
                    </Nav>
                    
                    <Nav className="ms-auto">
                        {!isAuth ? (
                            <div className="d-flex drop">
                                <button onClick={toSignInPage} className="mx-3 signin-btn">Sign In</button>

                                <p style={{visibility: 'hidden'}}></p>
                                
                                <button onClick={toSignUpPage} className="mx-3 signup-btn">Sign Up</button>
                            </div>
                        ):(
                            <div className="dropdown-container">
                                <Dropdown align="end">
                                    <Dropdown.Toggle className="toogle-menu" variant="link">
                                        <Image src={user.image} width={"50px"} roundedCircle/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="profile-menu">
                                        <Dropdown.Item className="dd-item" href="/profile">Profile</Dropdown.Item>

                                        {!isAdmin ? (
                                            <Dropdown.Item className="dd-item" href="/cart">Cart</Dropdown.Item>
                                        ):(
                                            <Dropdown.Item className="dd-item" href="/dashboard">Dashboard</Dropdown.Item>
                                        )}

                                        <div style={{marginLeft: '15px', marginRight: '15px'}}>
                                            <Dropdown.Divider/>
                                        </div>

                                        <Dropdown.Item className="dd-logout" onClick={()=>dispatch(logout())}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComp