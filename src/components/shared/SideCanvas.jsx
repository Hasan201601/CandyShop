import { Offcanvas } from 'react-bootstrap';
import React, { Component } from 'react';
import Threedots from './ThreeDots';
import { Link } from 'react-router-dom';
import Login from './Login';

class SideCanvas extends Component {
    render() {
        return (
            <>
                {
                    this.props.component === "login" ?
                        <Offcanvas className="bg-dark-theme off-canvas-bs text-white" placement='end' show={this.props.show} onHide={this.props.handleClose}>

                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='fs-2 text-uppercase'>Login</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Threedots />
                            <Offcanvas.Body className='d-flex justify-content-center align-items-start my-4'>
                                <Login />
                            </Offcanvas.Body>
                        </Offcanvas>
                        :
                        <Offcanvas className="bg-dark-theme off-canvas-bs text-white" placement='end' show={this.props.show} onHide={this.props.handleClose}>

                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='fs-2 text-uppercase'>Search For Products on Our Site</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Threedots />
                            <Offcanvas.Body className='d-flex flex-column justify-content-start align-items-start my-4'>
                                <input className='text-white w-75 my-2 p-2 border-bottom bg-transparent border-0' type="text" placeholder='Search Site' />
                                <button className='btn px-2 text-white'><i className="bi bi-search"></i></button>
                            </Offcanvas.Body>
                        </Offcanvas>
                }
            </>

        );
    }
}

export default SideCanvas;
