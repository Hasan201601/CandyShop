import React, { Component } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { newArrivals } from '../../../assets/data/data';
import bg from "../../../assets/images/customer.jpg"

class PurchaseHistory extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="align-items-center">
                        <Col md={3} >
                            <img src={bg} className="rounded-circle" alt="" />
                        </Col>
                        <Col md={9}>
                            <h3>Otto</h3>
                            <h4>otto@gmail.com</h4>
                        </Col>
                    </Row>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>item</th>
                                <th>Status</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        {
                            newArrivals.slice(0, 5).map((na, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{na.name}</td>
                                    <td>pending
                                    </td>
                                    <td>{na.price}</td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                    <button className='btn btn-danger'><i className="bi bi-trash"></i> Delete User</button>
                </Container>
            </div>
        );
    }
}

export default PurchaseHistory;
