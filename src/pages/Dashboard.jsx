
import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import profile from "../assets/images/Profile.png"
import { setUser } from '../redux/UserSlice';
import withRouter from '../utilities/withRouter';
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
        this.handleLogOut = this.handleLogOut.bind(this);
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

    handleLogOut() {
        this.props.dispatch(setUser({}))
        this.props.navigate("/")
    }

    render() {
        return (
            <>
                <Navbar fixed='top' bg="transparent" expand={false}>
                    <Container fluid>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />

                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="start"
                            className="bg-blue-theme text-white"
                            onHide={this.handleClose}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel"><img src={this.props.user.user.profileImage ? this.props.user.user.profileImage : profile} alt="" width="70px" height="70px" className='rounded-circle' />
                                    <div></div></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Link to="/" className='link border-0'>
                                    <span className='fs-6 d-block text-center'><i class="bi bi-house"></i> Homepage</span>
                                </Link>
                                <Thelayout></Thelayout>
                            </Offcanvas.Body>
                            <div onClick={this.handleLogOut} className='btn text-white fs-6'>
                                <p><i className="bi bi-box-arrow-right fs-5"></i> LogOut</p>
                            </div>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                <Outlet />
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withRouter(Dashboard));
