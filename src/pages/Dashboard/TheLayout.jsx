import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import adminRoutes from './Routes/AdminRoutes';
import userRoutes from './Routes/UserRoutes';

class Thelayout extends Component {
    render() {
        const isAdmin = true
        return (
            <Nav className="justify-content-end flex-grow-1 pe-3">
                {
                    isAdmin ?
                        <>
                            {adminRoutes.map(route => <NavLink to={route.path} className={route.style}>
                                {route.routeName}
                            </NavLink>)}
                        </>
                        :
                        <>
                            {
                                userRoutes.map(route => <NavLink to={route.path} className={route.style}>
                                    {route.routeName}
                                </NavLink>)
                            }
                        </>
                }
            </Nav>
        );
    }
}

export default Thelayout;
