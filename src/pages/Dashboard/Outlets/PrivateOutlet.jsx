import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import Dashboard from '../../Dashboard';

class Privateoutlet extends Component {

    render() {

        return (
            this.props.user.user.userName ? <Dashboard><Outlet /></Dashboard> : <Navigate to="/login" />
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(Privateoutlet);
