import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import { addToCart, clearCart, decreaseFromCart, removeFromCart } from '../redux/CartSlice';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.handleIncrease = this.handleIncrease.bind(this)
        this.handleDecrease = this.handleDecrease.bind(this)
    }

    handleIncrease(item) {
        console.log(this.props);
        this.props.dispatch(addToCart(item))
        setInterval(() => {
            window.location.reload()
        }, 100)
    }
    handleDecrease(item) {
        console.log(this.props);
        this.props.dispatch(decreaseFromCart(item))
        setInterval(() => {
            window.location.reload()
        }, 1000)
    }
    handleRemove(item) {
        this.props.dispatch(removeFromCart(item))
        setInterval(() => {
            window.location.reload()
        }, 100)
    }
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "space-between", width: "100vw", minHeight: "100vh" }}>
                <Header />
                <div className=''>
                    <Container className='my-4 align-items-start'>
                        {
                            this.props.items.length === 0 ? (
                                <div >
                                    <p>Your cart is currently empty</p>
                                    <div >
                                        <Link to="/">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                className="bi bi-arrow-left"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                                />
                                            </svg>
                                            <span>Start Shopping</span>
                                        </Link>
                                    </div>
                                </div>
                            ) : <Row className='g-4'>
                                {this.props.items.map(item =>
                                    <Col xs={12} className="border rounded shadow">

                                        <Row className="g-2 align-items-center py-1 my-2 border-4">
                                            <Col xs={3}>
                                                <img src={item.img} className="rounded border" width="auto" height="70px" alt="" />
                                            </Col>
                                            <Col xs={3}>
                                                <h6 className=''>{item.name}</h6>
                                                <p onClick={() => this.handleRemove(item)} className='my-0 text-danger pointer '><small><i className="bi bi-archive"></i> Remove from cart</small></p>
                                            </Col>
                                            <Col xs={3}>
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <button onClick={() => this.handleDecrease(item)} className='btn btn-danger fs-6 px-2 py-0'>-</button>
                                                    <span className='mx-3 fs-3 opacity-75'>{item.cartQuantity}</span>
                                                    <button onClick={() => this.handleIncrease(item)} className='btn btn-danger fs-6 px-2 py-0 ' >+</button>
                                                </div>
                                            </Col>
                                            <Col>
                                                <h5>${item.cartQuantity * item.price}</h5>
                                            </Col>
                                        </Row>
                                    </Col>
                                )}
                                <div className='d-flex justify-content-between '>
                                    <div >
                                        <button onClick={() => this.props.dispatch(clearCart())} className='btn btn-outline-danger'> Clear Cart </button>
                                    </div>
                                    <div >
                                        <div className="continue-shopping">
                                            <h5 className='my-3'>Total : {this.props.amount}</h5>
                                            <div className='my-3'>
                                                <button className='btn btn-success'>Checkout</button>
                                            </div>
                                            <Link to="/">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    className="bi bi-arrow-left"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                                    />
                                                </svg>

                                                <span>Continue Shopping</span>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </Row>
                        }
                    </Container>
                </div>
                <ToastContainer />
                <Footer />
            </div >
        );
    }
}
const mapStateToProps = (state) => ({
    quantity: state.cart.cartTotalQuantity,
    amount: state.cart.cartTotalAmount,
    items: state.cart.cartItems
})
export default connect(mapStateToProps)(Cart);
