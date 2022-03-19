import axios from 'axios';
import React, { Component } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Outlet } from 'react-router';
import { newArrivals } from '../../../assets/data/data';

class Dashboardhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/orders")
            .then(res => {
                console.log(res.data)
                this.setState({
                    orders: res.data
                })
            })
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className='g-2 my-5'>
                        <Col xs={6} md={3}>
                            <Card className='bg-danger rounded text-white'>
                                <div className='d-flex justify-content-evenly align-items-center p-4'>
                                    <h3>44</h3>
                                    <h3>Users</h3>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} md={3}>
                            <Card className='bg-success  rounded text-white'>
                                <div className='d-flex justify-content-evenly align-items-center p-4'>
                                    <h3>44</h3>
                                    <h3>Orders</h3>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} md={3}>
                            <Card className='bg-info rounded text-white'>
                                <div className='d-flex justify-content-evenly align-items-center p-4'>
                                    <h3>44</h3>
                                    <h3>Products</h3>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={6} md={3}>
                            <Card className='bg-dark rounded text-white'>
                                <div className='d-flex justify-content-evenly align-items-center p-4'>
                                    <h3>44</h3>
                                    <h3>Shipped</h3>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <h5>Recent Orders</h5>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>item</th>
                                <th>User Email</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        {
                            newArrivals.map((na, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{na.name}</td>
                                    <td>Otto</td>
                                    <td>{na.price}</td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Dashboardhome;
