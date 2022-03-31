import axios from 'axios';
import React, { Component } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../assets/data/api';
import { newArrivals } from '../../../assets/data/data';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            orders: [],
        }
    }

    componentDidMount() {
        axios.get(baseUrl + `/api/orders`, {
            headers: {
                token: `Bearer ${this.props.user.user.accessToken}`
            }
        })
            .then(res => this.setState({ orders: res.data }))
    }
    handleChange(e) {
        this.setState({
            status: e.target.value
        })
    }
    handleChangeStatus(e, id) {
        e.preventDefault()
        axios.put(baseUrl + `/api/orders/${id}`, { status: this.state.status }, {
            headers: {
                token: `Bearer ${this.props.user.user.accessToken}`
            }
        })
            .then(res => console.log(res.data))
    }
    handleDelete(id) {
        const remainingOrders = this.state.orders.filter(order => order._id !== id)
        this.setState({ orders: remainingOrders })
        axios.delete(baseUrl + `/api/orders/${id}`, {
            headers: {
                token: `Bearer ${this.props.user.user.accessToken}`
            }
        })
            .then(res => console.log(res.data))
    }

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
                            this.state.orders.map((order, index) => <tbody key={index}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{order.userId}</td>
                                    <td>{order.userEmail}</td>
                                    <td>
                                        <form className='d-flex'>
                                            <select onChange={e => this.handleChange(e)} class="form-select  m-auto" aria-label="Default select example">
                                                <option value="pending">{order.status}</option>
                                                <option value="approved">approved</option>
                                                <option value="shipped">shipped</option>
                                            </select>
                                            <button type="submit" className='btn btn-sm btn-info text-white' onClick={(e) => this.handleChangeStatus(e, order._id)}> change</button>
                                        </form>
                                    </td>
                                    <td onClick={() => this.handleDelete(order._id)} className=' pointer text-dark'><i className="bi bi-trash" ></i>  Delete Order</td>
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
export default connect(mapStateToProps)(Orders);
