import axios from 'axios';
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import withRouter from '../../../utilities/withRouter';

class Editproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img1: null,
            img2: null,
            img3: null,
            productName: "",
            category: "",
            price: 0,
            stock: 0,
            desc1: "",
            desc2: "",
            desc3: ""

        }
    }
    handleFirstImage(e) {
        this.setState({ img1: e.target.files[0] })
    }
    handleSecondImage(e) {
        this.setState({ img2: e.target.files[0] })
    }
    handleThirdImage(e) {
        this.setState({ img3: e.target.files[0] })
    }
    handleProductNameChange(e) {
        this.setState({ productName: e.target.value })
    }
    handleCategoryChange(e) {
        this.setState({ category: e.target.value })
    }
    handlePriceChange(e) {
        this.setState({ price: e.target.value })
    }
    handleStockChange(e) {
        this.setState({ stock: e.target.value })
    }
    handleFirstDescChange(e) {
        this.setState({ desc1: e.target.value })
    }
    handleSecondDescChange(e) {
        this.setState({ desc2: e.target.value })
    }
    handleThirdDescChange(e) {
        this.setState({ desc3: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("img1", this.state.img1)
        data.append("img2", this.state.img2)
        data.append("img3", this.state.img3)
        data.append("productName", this.state.productName)
        data.append("category", this.state.category)
        data.append("price", this.state.price)
        data.append("stock", this.state.stock)
        data.append("desc", this.state.desc1)
        data.append("desc", this.state.desc2)
        data.append("desc", this.state.desc3)
        const id = this.props.params.id;
        const token = this.props.user.user.accessToken
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'PUT',
            body: data,
            headers: {
                token: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div>
                Update Product {this.props.params.id}
                <Container className='my-5' >
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <Row className='mx-md-5 m-auto'>
                            <h5>Update Images</h5>
                            <div className="form-group  my-3">
                                <input onChange={e => this.handleFirstImage(e)} accept="images/*" type="file" className="form-control" id="img1" placeholder="image1" />
                            </div>
                            <div className="form-group my-3">
                                <input onChange={e => this.handleSecondImage(e)} accept="images/*" type="file" className="form-control" id="exampleInputPassword1" placeholder="image2" />
                            </div>
                            <div className="form-group my-3">
                                <input onChange={e => this.handleThirdImage(e)} type="file" accept="images/*" className="form-control" id="exampleInputPassword1" placeholder="image3" />
                            </div>
                        </Row>
                        <Row className='align-items-center justify-content-center'>
                            <h5>Update Product Description</h5>
                            <Col xs={12} md={6}>
                                <div className="form-group my-3">
                                    <input className="form-control" onChange={e => this.handleProductNameChange(e)} type="text" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group my-3">
                                    <input onChange={e => this.handleCategoryChange(e)} type="text" className="form-control" placeholder="Enter Category" />
                                </div>
                                <div className="form-group my-3">
                                    <input onChange={e => this.handlePriceChange(e)} type="number" className="form-control" placeholder="Enter Price" />
                                </div>
                                <div className="form-group my-3">
                                    <input className="form-control" onChange={e => this.handleStockChange(e)} type="number" placeholder="Available Stock" />
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="form-group my-3">
                                    <textarea onChange={e => this.handleFirstDescChange(e)} type="text" placeholder='description1' className="form-control" />
                                </div>
                                <div className="form-group my-3">
                                    <textarea onChange={e => this.handleSecondDescChange(e)} type="text" placeholder='description2' className="form-control" />
                                </div>
                                <div className="form-group my-3">
                                    <textarea onChange={e => this.handleThirdDescChange(e)} type="text" placeholder='description3' className="form-control" />
                                </div>
                            </Col>
                        </Row>
                        <button type="submit" className="btn btn-primary">Update Product</button>
                    </form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withRouter(Editproduct));
