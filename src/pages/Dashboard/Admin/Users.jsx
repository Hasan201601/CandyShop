import axios from 'axios';
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
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
        axios.get("http://localhost:5000/api/users", {
            headers: {
                token: `Bearer ${this.props.user.user.accessToken}`
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ users: res.data })
            })
    }
    handleDelete(id) {
        axios.delete(`http://localhost:5000/api/users/${id}`, {
            headers: {
                token: `Bearer ${this.props.user.user.accessToken}`
            }
        })
            .then(res => console.log(res.data))
        const remainingUsers = this.state.users.filter(user => user.id !== id)
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
                            this.state.users.map((na, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{na.userName}</td>
                                    <td>{na.email}</td>
                                    <td><Link className='text-decoration-none' to={`${na._id}`}>Purchase History</Link></td>
                                    <td ><button className='btn' disabled={na.isAdmin} onClick={() => this.handleDelete(na._id)}><i className="bi bi-trash pointer text-dark"></i> Delete Account</button> </td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(Users);
