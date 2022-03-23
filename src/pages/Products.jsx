import React, { Component } from 'react';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

import withRouter from '../utilities/withRouter';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { categoryData, newArrivals } from '../assets/data/data';
import { addToCart } from '../redux/CartSlice';
import { connect } from 'react-redux';
import axios from 'axios';


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 0,
            sort: 0,
            products: [],
            filteredProducts: [],
            isLoading: false

        }
        this.handleSort = this.handleSort.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }
    handleSort(e) {
        this.setState({
            sort: e.target.value
        })
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        if (this.props.params.category === "all") {
            axios.get(`http://localhost:5000/api/products`)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        isLoading: false,
                        products: res.data,
                        filteredProducts: res.data
                    })
                })
            return
        }
        axios.get(`http://localhost:5000/api/products/${this.props.params.category}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    isLoading: false,
                    products: res.data,
                    filteredProducts: res.data
                })
            })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    handleCategoryChange(e) {
        console.log(this.state.products);
        console.log(e.target.value)
        if (e.target.value === "All Products") {
            this.setState({ filteredProducts: this.state.products })
        } else {
            const filteredProducts = this.state.products.filter(pd => pd.category === e.target.value)
            console.log(filteredProducts)
            this.setState({ filteredProducts: filteredProducts })
        }

    }

    render() {
        return (
            <div id="P">
                <Header />
                <Container>
                    <div className='d-flex align-items-center justify-content-space-around mt-5 mb-3'>
                        {this.props.params.category !== "all" ? "" :
                            <div className='w-25 m-auto'>
                                <p>Filter</p>
                                <Form.Select className='text-center' onChange={e => this.handleCategoryChange(e)} name="cars" id="cars">
                                    <option >Filter by Category</option>
                                    {categoryData.map(data => <option value={data.category}>{data.category}</option>)}
                                </Form.Select>
                            </div>
                        }
                        <div className='w-25 m-auto'>
                            <p>Sort</p>
                            <Form.Select className='text-center' onChange={this.handleSort} aria-label="Default select example" >
                                <option>Featured</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>
                    </div>

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

                    <h4>{this.props.category}</h4>

                    {this.state.filteredProducts.length === 0 ? <div className='my-5 '>
                        <span className='text-white bg-danger p-2 px-3 mt-5 fs-4 rounded'>{"No products Found"}</span>
                    </div> : <Row xs={1} md={4} className="g-4 my-3 p-4">
                        {this.state.filteredProducts.map((na, index) => (
                            <Col className=' rounded-0'>
                                <Card className='shadow-lg border-1 rounded-0' bg="transparent" data-bs-toggle="tooltip" data-bs-placement="top" title={na.title} >
                                    <Link className='text-decoration-none' to={`${na._id}`}>
                                        <div className="pointer px-2 pt-2">
                                            <Card.Img height="240px" className='w-100 rounded-0 shadow-sm cover' variant="top" src={na.img1} />
                                        </div>
                                    </Link>
                                    <Card.Body className="p-0 text-center">
                                        <Link className='text-decoration-none' to={`${na._id}`}>
                                            <Card.Title className='text-uppercase my-3 fs-6'>{na.name}</Card.Title>
                                            <Card.Text>
                                                <p className='opacity-75 px-3'><small>{na.desc}</small></p>
                                                <strong className='text-danger'>${na.price}</strong>
                                            </Card.Text>
                                        </Link>
                                        <div className='text-center'>
                                            <button onClick={() => {
                                                this.props.dispatch(addToCart(na))
                                                this.props.navigate('/cart')
                                            }} className='rounded-0 py-2 text-uppercase w-100 btn btn-danger '>Add To Cart</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>}

                </Container>
                <Footer />
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    quantity: state.cart.cartTotalQuantity,
    amount: state.cart.cartTotalAmount
})
export default connect(mapStateToProps)(withRouter(Products));