import React, { Component } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { newArrivals } from '../../../assets/data/data';
import bg from "../../../assets/images/customer.jpg"
import avatar from "../../../assets/images/avatar.png"
import withRouter from '../../../utilities/withRouter';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../assets/data/api';

class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get(baseUrl + `/api/orders/find/${this.props.params.id}`, {
            headers: {
                token: `Bearer ${this.props.user.user.accessToken}`
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    orders: res.data
                })
            })
    }
    handleDelete(id) {
        axios.delete(baseUrl + `/api/users/find/${id}`, {
            headers: {
                token: `Bearer ${this.props.user.user.accessToken}`
            }
        })
            .then(res => console.log(res.data))
        this.props.navigate(-1)
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="align-items-center my-5">
                        <Col md={3} >
                            <img height="200px" src={avatar} className="rounded-circle " alt="" />
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
                            this.state.orders.slice(0, 5).map((order, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{order.userId}</td>
                                    <td>{order.userEmail}</td>
                                    <td>&euro;{order.amount / 100}</td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                    <button disabled={this.props.user.user.isAdmin} onClick={() => this.handleDelete(this.props.params.id)} className='btn btn-danger my-2'><i className="bi bi-trash"></i> Delete User</button>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withRouter(PurchaseHistory));
