import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

class Thelayout extends Component {
    render() {
        return (
            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="home" className='link'>Dashboard</Link>
                <Link to="orders" className='link'>Orders</Link>
                <NavLink to="createProduct" className='link'>Create New Product</NavLink>
                <NavLink to="products" className='link'>Products</NavLink>
                <NavLink to="users" className='link'>Users</NavLink>
            </Nav>
        );
    }
}

export default Thelayout;
