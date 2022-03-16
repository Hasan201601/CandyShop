import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router';
import Dashboard from '../../Dashboard';

class AdminOutlet extends Component {
    render() {
        const isAdmin = true;
        return (
            isAdmin ? <Dashboard><Outlet /></Dashboard> : <Navigate to="/login" />
        );
    }
}

export default AdminOutlet;
