import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { newArrivals } from '../assets/data/data';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import withRouter from '../utilities/withRouter';

class Product extends Component {
    componentDidMount() {
        window.scrollTo(0, 140)
    }
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
        this.handleImageChange = this.handleImageChange.bind(this);
    }
    handleImageChange(img) {
        this.setState({
            image: img
        })
    }
    render() {
        const product = newArrivals.find(pd => pd.id == this.props.params.productId)
        return (
            <div >
                {console.log(product)}
                <Header />
                <Container className='my-5'>
                    <Row className='g-3 align-items-center justify-content-center'>
                        <Col md={6}>
                            <div className='my-2 border-3'>
                                <img src={this.state.image ? this.state.image : product.img} className="w-75 " alt="" />
                            </div>
                            <Row className='g-md-4 g-2'>
                                <Col xs={4} md={4} >
                                    <Card className='border-3 shadow h-100 p-1 pointer'>
                                        <img src={product.img} className="w-100" alt="" onClick={() => this.handleImageChange(product.img)} />
                                    </Card>
                                </Col>
                                <Col xs={4} md={4}>
                                    <Card className='border-3 shadow h-100 p-1 pointer'>
                                        <img src={product.img2} className="w-100" alt="" onClick={() => this.handleImageChange(product.img2)} />
                                    </Card>
                                </Col>
                                <Col xs={4} md={4}>
                                    <Card className='border-3 shadow h-100 p-1 pointer'>
                                        <img src={product.img3} className="w-100" alt="" onClick={() => this.handleImageChange(product.img3)} />
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className="ps-4">
                            <h1>{product.name}</h1>
                            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nihil? Officia officiis consequuntur aliquam eum, voluptates temporibus dolorum quam ipsum voluptate id quo nesciunt sit asperiores voluptatem fuga atque molestias perferendis! Cumque iste, et reiciendis itaque voluptas libero, accusamus est quia nihil ullam dicta soluta pariatur maxime quis omnis iusto.</h6>
                            <br />
                            <p>Quantity</p>
                            <div className='d-flex align-items-center justify-content-center'>
                                <button className='btn btn-danger fs-5 px-3'>-</button>
                                <span className='mx-3 fs-4'>{5}</span>
                                <button className='btn btn-danger fs-5 px-3'>+</button>
                            </div>
                            <button className='btn btn-lg btn-info text-white  my-5'>ADD TO CART</button>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Product);