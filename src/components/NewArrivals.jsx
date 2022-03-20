import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newArrivals } from '../assets/data/data';
import product from "../assets/images/product.jpg"
import { addToCart } from '../redux/CartSlice';
import withRouter from '../utilities/withRouter';

class Newarrivals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestProducts: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        axios.get("http://localhost:5000/api/products/latest")
            .then(res => {
                this.setState({ isLoading: false })
                console.log(res.data)
                this.setState({ latestProducts: res.data })
            })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <div className=' my-5 py-5 text-center'>
                <h3 className=''>New Arrivals</h3>
                <div className='fw-boldmt-2 w-50 m-auto'>
                    <p>Check out all the fantastic new treats just landed here at Candymail HQ</p>
                </div>
                <Container>
                    <Row xs={1} md={4} className="g-4 my-3 p-4">
                        {this.state.isLoading && <Button className='fw-bolder m-auto my-5 ' variant="transparent" >
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading Products...
                        </Button>}
                        {this.state.latestProducts.map((na) => (
                            <Col className=' rounded-0'>
                                <Card className='shadow-lg border-1 rounded-0' bg="transparent" data-bs-toggle="tooltip" data-bs-placement="top" title={na.name} >
                                    <Link className='text-decoration-none' to={`${na.id}`}>
                                        <div className="pointer px-2 pt-2">
                                            <Card.Img height="240px" className='w-100 rounded-0 shadow-sm cover' variant="top" src={na.img} />
                                        </div>
                                    </Link>
                                    <Card.Body className="p-0 text-center">
                                        <Link className='text-decoration-none' to={`${na.id}`}>
                                            <Card.Title className='text-uppercase my-3 fs-6'>{na.name}</Card.Title>
                                            <Card.Text>
                                                <p className='opacity-75 px-3'><small>{na.desc}</small></p>
                                                <strong className='text-danger'>${na.price}</strong>
                                            </Card.Text>
                                        </Link>
                                        <div className='text-center'>
                                            <button onClick={() => {
                                                this.props.dispatch(addToCart(na))
                                                console.log(this.props)
                                                this.props.navigate('/cart')
                                            }} className='rounded-0 py-2 text-uppercase w-100 btn btn-danger '>Add To Cart</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <button className='btn btn-lg btn-info text-white fs-6 fw-bold rounded-0'><Link to={`/products/all`} className="text-decoration-none text-white">View All</Link></button>
            </div >
        );
    }
}
const mapStateToProps = (state) => ({
    quantity: state.cart.cartTotalQuantity,
    amount: state.cart.cartTotalAmount
})
export default connect(mapStateToProps)(withRouter(Newarrivals));
