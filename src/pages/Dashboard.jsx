
import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profile from "../assets/images/customer.jpg"
import Thelayout from './Dashboard/TheLayout';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            component: ""
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleShow(component) {
        this.setState({
            show: true,
            component: component
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <>
                <Navbar bg="transparent" expand={false}>
                    <Container fluid>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        <Navbar.Brand className='m-auto text-uppercase' href="#">Welome to your dashboard</Navbar.Brand>
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="start"
                            className="bg-blue-theme text-white"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel"><img src={profile} alt="" width="70px" height="70px" className='rounded-circle' />
                                    <div></div></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Link to="/" className='link border-0'>
                                    <span className='fs-6 d-block text-center'><i class="bi bi-house"></i> Homepage</span>
                                </Link>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="#action1" className='link'>Dashboard</Nav.Link>
                                    <Nav.Link href="#action1" className='link'>Orders</Nav.Link>
                                    <Nav.Link href="#action1" className='link'>View Products</Nav.Link>
                                    <Nav.Link href="#action1" className='link'>Create New Product</Nav.Link>
                                    <Nav.Link href="#action1" className='link'>Edit Products</Nav.Link>
                                    <Nav.Link href="#action1" className='link'>Users</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                            <div className='btn text-white fs-6'>
                                <p><i className="bi bi-box-arrow-right fs-5"></i> LogOut</p>
                            </div>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                <Thelayout></Thelayout>
            </>
        );
    }
}

export default Dashboard;
