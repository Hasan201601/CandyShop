import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { newArrivals } from '../../../assets/data/data';

class Purchase extends Component {
    render() {
        return (
            <div>
                <Container className='my-5'>
                    <h4>My Purchase History</h4>

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

                </Container>
            </div>
        );
    }
}

export default Purchase;
