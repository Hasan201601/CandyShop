import React, { Component } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newArrivals } from '../../../assets/data/data';

class Orders extends Component {
    render() {
        return (
            <div>
                <Container className='my-5'>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>item</th>
                                <th>Username</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            newArrivals.map((na, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{na.name}</td>
                                    <td>Otto</td>
                                    <td>
                                        <select class="form-select w-50 m-auto" aria-label="Default select example">
                                            <option selected>pending</option>
                                            <option value="1">approved</option>
                                            <option value="2">shipped</option>
                                        </select>
                                    </td>
                                    <td className=' pointer text-dark'><i className="bi bi-trash"></i> Delete Order</td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Orders;
