import React, { Component } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Threedots from './shared/ThreeDots';
import { chocMysteryData } from '../assets/data/data';
import { addToCart } from '../redux/CartSlice';
import { connect } from 'react-redux';
import withRouter from '../utilities/withRouter';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../assets/data/api';

class Mysterybox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mysteryProducts: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        axios.get(baseUrl + "/api/products/mystery/recent")
            .then(res => {
                this.setState({ isLoading: false })
                console.log(res.data)
                this.setState({ mysteryProducts: res.data })
                console.log(this.state.mysteryProducts);
            })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        return (
            <div className=' py-5  text-center'>
                <h3 className=''>Mystery Box</h3>
                <Threedots />
                <div className='fw-bold mt-2 w-50 m-auto'>
                    <p>Spend £25 on treats and you can add one of these American Kit Kats to your cart absolutely Free!</p>

                    <p>Just add one to your cart and when you spend £25 this will be automatically be discounted 100%!</p>

                    <p>Not in conjunction with any other offer!</p>

                    <p>To receive your free Item they must be added to the cart!</p>

                    <p>Offer Ends Midnight 08/03/22</p>
                </div>
                <Container>
                    {this.state.isLoading ? <Button className='fw-bolder m-auto my-5 ' variant="transparent" >
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading Products...
                    </Button> :
                        <Row xs={1} md={3} className="g-4">
                            {this.state.mysteryProducts.length === 0 ? <div className='mt-5'>
                                <span className='text-white bg-danger p-2 px-3 mt-5 fs-4 rounded'>{"No products Found"}</span>
                            </div> :
                                this.state.mysteryProducts.map((mp) => (
                                    <Col >
                                        <Card className='shadow-lg border-1' bg="transparent" data-bs-toggle="tooltip" data-bs-placement="top" title={mp.title} >
                                            <div className='card-img'>
                                                <Card.Img width="200px" height="300px" className='w-100 border-3 cover shadow-sm' variant="top" src={mp.img1} />
                                            </div>
                                            <Card.Body className="">
                                                <Card.Title className='opacity-75'>{mp.title}</Card.Title>
                                                <Card.Text className=' opacity-75'>
                                                    <strong>&#163;{mp.price}</strong>
                                                </Card.Text>
                                                <div className='text-center my-2'>
                                                    <button className='btn btn-danger rounded-pill' onClick={() => {
                                                        this.props.dispatch(addToCart(mp))
                                                        this.props.navigate("/cart")
                                                    }}>Add To Cart</button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    }
                </Container>

                <Link to="/products/mysterybox">
                    <button className='btn btn-lg btn-info fw-bold fs-6 text-white my-5 rounded-pill' onClick={this.handleClick}>View All</button>
                </Link>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    quantity: state.cartTotalQuantity,
    amount: state.cartTotalAmount
});


export default connect(mapStateToProps)(withRouter(Mysterybox));
