import React, { Component } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';

class Dashboardhome extends Component {
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
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Dashboardhome;
