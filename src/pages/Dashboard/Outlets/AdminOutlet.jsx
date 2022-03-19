import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import Dashboard from '../../Dashboard';

class AdminOutlet extends Component {
    render() {
        return (
            this.props.user.user.isAdmin ? <Dashboard><Outlet /></Dashboard> : <Navigate to="/login" />
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(AdminOutlet);
