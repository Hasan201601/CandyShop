import React, { Component } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { newArrivals } from '../../../assets/data/data';
import bg from "../../../assets/images/customer.jpg"
import avatar from "../../../assets/images/avatar.png"
import withRouter from '../../../utilities/withRouter';
import { connect } from 'react-redux';
import axios from 'axios';

class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:500/api/orders/${this.props.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    orders: res.data
                })
            })
    }
    handleDelete(id) {
        axios.delete(`http://localhost:500/api/users/find/${id}`)
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
                    <button onClick={() => this.handleDelete(this.props.params.id)} className='btn btn-danger my-2'><i className="bi bi-trash"></i> Delete User</button>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withRouter(PurchaseHistory));
