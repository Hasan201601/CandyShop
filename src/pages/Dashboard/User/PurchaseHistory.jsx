import axios from 'axios';
import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { newArrivals } from '../../../assets/data/data';

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: []
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/api/orders/purchase/${this.props.user.user._id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ purchased: res.data })
            })
    }
    render() {
        return (
            <div>
                <Container className='my-5'>
                    <h4>My Purchase History</h4>

                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>Order No.</th>
                                <th>items</th>
                                <th>Status</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        {
                            this.state.purchased.map((na, index) => <tbody>
                                <tr className='align-middle'>

                                    <td>{na._id}</td>
                                    <td>
                                        <div className='d-flex align-items-center flex-wrap justify-content-center'>
                                            {na.items.map(item => <span className='bg-transparent'>({item.title},{item.cartQuantity} items)</span>)}
                                        </div>
                                    </td>
                                    <td>{na.status}
                                    </td>
                                    <td>&pound;{na.amount / 100}</td>
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

export default connect(mapStateToProps)(Purchase);
