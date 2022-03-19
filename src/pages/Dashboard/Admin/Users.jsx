import axios from 'axios';
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newArrivals } from '../../../assets/data/data';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

    }

    componentDidMount() {
        axios.get("http://localhost:500/api/users")
            .then(res => {
                console.log(res.data)
                this.setState({ users: res.data })
            })
    }
    handleDelete(id) {
        axios.delete(`http://localhost:500/api/users/${id}`)
            .then(res => console.log(res.data))
        const remainingUsers = this.state.users.map(user => user.id === id)
        this.setState({ users: remainingUsers })
    }
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
                                    <td onClick={() => this.handleDelete(na.id)}><i className="bi bi-trash pointer text-dark"></i> Delete Account</td>
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
