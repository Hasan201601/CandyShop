import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newArrivals } from '../../../assets/data/data';

class Users extends Component {
    render() {
        return (
            <div>
                <Container className='my-5'>
                    <h4>Users</h4>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>History</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            newArrivals.map((na, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{na.name}</td>
                                    <td>Otto@gmail.com</td>
                                    <td><Link className='text-decoration-none' to={`${na.id}`}>Purchase History</Link></td>
                                    <td><i className="bi bi-trash pointer text-dark"></i> Delete Account</td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Users;
