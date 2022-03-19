import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import checkout from "../assets/images/checkout.jpg"
import Pay from './Payment/Pay';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            address: '',
            phone: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleAddressChange(e) {
        this.setState({
            address: e.target.value
        })
    }
    handlePhoneChange(e) {
        this.setState({
            phone: e.target.value
        })
    }

    render() {
        return (
            <div style={{ background: `url(${checkout}) no-repeat`, minHeight: "100vh", backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Container className='p-1 p-md-4 m-auto'>
                    <div style={{ maxWidth: "600px" }} className='m-auto shadow-lg bg-white rounded p-3 p-md-5'>
                        <h5 >Shipping & Payment</h5>
                        <div class="form-group my-3">
                            <input onChange={(e) => this.handleEmailChange(e)} type="email" className="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />

                        </div>
                        <div class="form-group my-3">
                            <input onChange={(e) => this.handleAddressChange(e)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Shipping address" required />

                        </div>
                        <div class="form-group my-3">
                            <input onChange={(e) => this.handlePhoneChange(e)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone number" required />

                        </div>
                        <div className='my-3'>
                            <Pay
                                email={this.state.email}
                                address={this.state.address}
                                phone={this.state.phone}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Checkout;
