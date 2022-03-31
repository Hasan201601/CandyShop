import axios from 'axios';
import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { baseUrl } from '../assets/data/api';
import { newArrivals } from '../assets/data/data';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { addToCart } from '../redux/CartSlice';
import withRouter from '../utilities/withRouter';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            quantity: 0,
            product: []
        }
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }


    componentDidMount() {
        window.scrollTo(0, 140)
        axios.get(baseUrl + `/api/products/find/${this.props.params.productId}`)
            .then(res => {
                console.log(res.data);
                this.setState({ product: res.data })
            })
    }
    handleImageChange(img) {
        this.setState({
            image: img
        })
    }
    handleIncrease() {
        this.setState((prevState, { quantity }) => ({
            quantity: prevState.quantity + 1
        }))
    }
    handleDecrease() {
        if (!this.state.quantity) {
            return
        } else {
            this.setState((prevState, { quantity }) => ({
                quantity: prevState.quantity - 1
            }))
        }

    }
    handleAddToCart(product) {
        const addedProduct = {
            ...product,
            addedQuantity: this.state.quantity
        }
        this.props.dispatch(addToCart(addedProduct))
        this.props.navigate("/cart")
        console.log(this.props);
    }
    render() {
        return (
            <div >
                <Header />
                <Container className='my-5'>
                    <Row className='g-3 align-items-center justify-content-center'>
                        <Col md={6}>
                            <div className='my-2 border-3'>
                                <img src={this.state.image ? this.state.image : this.state.product.img1} className="w-75 " alt="" />
                            </div>
                            <Row className='g-md-4 g-2'>
                                <Col xs={4} md={4} >
                                    <Card className='border-3 shadow h-100 p-1 pointer'>
                                        <img src={this.state.product.img1} className="w-100" alt="" onClick={() => this.handleImageChange(this.state.product.img1)} />
                                    </Card>
                                </Col>
                                <Col xs={4} md={4}>
                                    <Card className='border-3 shadow h-100 p-1 pointer'>
                                        <img src={this.state.product.img2} className="w-100" alt="" onClick={() => this.handleImageChange(this.state.product.img2)} />
                                    </Card>
                                </Col>
                                <Col xs={4} md={4}>
                                    <Card className='border-3 shadow h-100 p-1 pointer'>
                                        <img src={this.state.product.img3} className="w-100" alt="" onClick={() => this.handleImageChange(this.state.product.img3)} />
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className="ps-4">
                            <h1>{this.state.product.title}</h1>
                            <h6>{this.state.product.desc1}</h6>
                            <h6>{this.state.product.desc2}</h6>
                            <h6>{this.state.product.desc3}</h6>
                            <p className=' my-3 '><small>{this.state.product.stock} available in stock</small></p>
                            <br />
                            <p>Quantity</p>
                            <div className='d-flex align-items-center justify-content-center'>
                                <button onClick={this.handleDecrease} className='btn btn-danger fs-5 px-3'>-</button>
                                <span className='mx-3 fs-4'>{this.state.quantity}</span>
                                <button className='btn btn-danger fs-5 px-3' onClick={this.handleIncrease}>+</button>
                            </div>
                            <button disabled={this.state.product.stock - this.state.quantity < 0 ? true : false} onClick={() => this.handleAddToCart(this.state.product)} className='btn btn-lg btn-info text-white  my-5'>ADD TO CART</button>
                        </Col>
                    </Row>
                </Container >
                <Footer />
            </div >
        );
    }
}
const mapStateToProps = (state) => ({
    quantity: state.cart.cartTotalQuantity,
    amount: state.cart.cartTotalAmount
})

export default connect(mapStateToProps)(withRouter(Product));