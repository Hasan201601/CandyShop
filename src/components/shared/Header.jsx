import React, { useEffect, useState } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { isExpired, decodeToken } from "react-jwt";
import { Link, NavLink } from 'react-router-dom';
import { categoryData } from '../../assets/data/data';
import Auth from "../../Authentication/Auth"
import { getTotals } from '../../redux/CartSlice';
import { setUser } from '../../redux/UserSlice';
import SideCanvas from './SideCanvas';

const Header = () => {
    const [show, setShow] = useState(false)
    const [component, setComponent] = useState("");
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const isAdmin = user.user?.isAdmin;
    const dispatch = useDispatch()
    const handleShow = (component) => {
        setShow(true)
        setComponent(component)
    }
    useEffect(() => {
        dispatch(getTotals())
    }, [dispatch, cart]);

    const handleClose = () => {
        setShow(false)
        setComponent(component)
    }
    const handleLogout = () => {
        dispatch(setUser({}))
    }
    return (
        <div className='py-2 bg-dark-theme border-theme'>
            <Navbar
                className="px-2 d-flex justify-content-space-evenly"
                collapseOnSelect
                expand="lg"
                variant="dark"
                sticky="top"
            >
                <Navbar.Brand><Link to="/" className='text-decoration-none text-white fw-bold fs-2'>Candy<span className='text-danger'>Shop</span></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto d-flex align-items-center justify-content-center">
                        <NavLink to="/" className='mx-2 text-decoration-none text-white'>Home</NavLink>
                        <NavDropdown menuVariant="dark" title="All Products" id="collasible-nav-dropdown">
                            {categoryData.map(cat => <NavDropdown.Item href="#action/3.1">{cat.category}</NavDropdown.Item>
                            )}

                            <NavDropdown.Divider />
                        </NavDropdown >
                        <NavLink to="/" className='mx-2 text-decoration-none text-white'>New Arrivals</NavLink>
                        {
                            user.user.userName ? <NavLink to={isAdmin ? "/dashboard" : "/userDashboard"} className='mx-2 text-decoration-none text-white'>Dashboard</NavLink> : <></>
                        }
                    </Nav >
                </Navbar.Collapse >
                <SideCanvas
                    show={show}
                    handleClose={handleClose}
                    component={component}
                />
                <div className='bg-dark-theme my-2'  >
                    <div className='d-flex justify-content-end align-items-center '>
                        <button
                            className='btn btn-info px-3 pointer rounded'
                            onClick={() => handleShow("search")}
                        >
                            <i className="bi bi-search"></i> Search
                        </button>
                        <div className='px-3 pointer'>
                            {user.user.email ?
                                <>
                                    <div onClick={handleLogout} className="btn btn-info">LogOut</div>
                                </> :
                                <div onClick={() => handleShow("login")} >
                                    <i className="bi bi-person-fill header-icon"></i>Login
                                </div>
                            }
                        </div>
                        <Link to="/cart" className='text-decoration-none text-white'>
                            <div
                                className='px-2 pointer'
                            >
                                <span className='px-3 d-flex align-items-center'>
                                    <i className="bi bi-cart header-icon fs-3"></i><Badge bg="info" className='pe-2'>{cart.cartTotalQuantity}</Badge>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div >
            </Navbar >


        </div >
    );
};

export default Header;


/* import React, { Component } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { categoryData } from '../../assets/data/data';
import { getTotals } from '../../redux/CartSlice';
import SideCanvas from './SideCanvas';



class Header extends Component {
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

    componentDidMount() {
        this.props.dispatch(getTotals())
    }

    render() {
        const isAdmin = true
        return (
            <div className='py-2 bg-dark-theme border-theme'>
                <Navbar
                    className="px-2 d-flex justify-content-space-evenly"
                    collapseOnSelect
                    expand="lg"
                    variant="dark"
                    sticky="top"
                >
                    <Navbar.Brand><Link to="/" className='text-decoration-none text-white fw-bold fs-2'>Candy<span className='text-danger'>Shop</span></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="m-auto d-flex align-items-center justify-content-center">
                            <NavLink to="/" className='mx-2 text-decoration-none text-white'>Home</NavLink>
                            <NavDropdown menuVariant="dark" title="All Products" id="collasible-nav-dropdown">
                                {categoryData.map(cat => <NavDropdown.Item href="#action/3.1">{cat.category}</NavDropdown.Item>
                                )}

                                <NavDropdown.Divider />
                            </NavDropdown >
                            <NavLink to="/" className='mx-2 text-decoration-none text-white'>New Arrivals</NavLink>
                            <NavLink to={isAdmin ? "/dashboard" : "/userDashboard"} className='mx-2 text-decoration-none text-white'>Dashboard</NavLink>
                        </Nav >
                    </Navbar.Collapse >
                    <SideCanvas
                        show={this.state.show}
                        handleClose={this.handleClose}
                        component={this.state.component}
                    />
                    <div className='bg-dark-theme my-2'  >
                        <div className='d-flex justify-content-end align-items-center '>
                            <button
                                className='btn btn-info px-3 pointer rounded'
                                onClick={() => this.handleShow("search")}
                            >
                                <i className="bi bi-search"></i> Search
                            </button>
                            <div onClick={() => this.handleShow("login")}
                                className='px-3 pointer'>
                                <i className="bi bi-person-fill header-icon"></i> Account
                            </div>
                            <Link to="/cart" className='text-decoration-none text-white'>
                                <div
                                    className='px-2 pointer'
                                >
                                    <span className='px-3 d-flex align-items-center'>
                                        <i className="bi bi-cart header-icon fs-3"></i><Badge bg="info" className='pe-2'>{this.props.quantity}</Badge>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Navbar >


            </div >
        );
    }
}
const mapStateToProps = (state) => ({
    quantity: state.cart.cartTotalQuantity,
    amount: state.cart.cartTotalAmount
})

export default connect(mapStateToProps)(Header);
 */