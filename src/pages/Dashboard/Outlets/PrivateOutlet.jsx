import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router';
import Dashboard from '../../Dashboard';

class Privateoutlet extends Component {
    render() {
        const auth = true;
        return (
            auth ? <Dashboard><Outlet /></Dashboard> : <Navigate to="/login" />
        );
    }
}

export default Privateoutlet;
