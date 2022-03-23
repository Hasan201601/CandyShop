import axios from 'axios';
import React, { Component } from 'react';
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { categoryData } from '../../../assets/data/data';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img1: '',
            img2: "",
            img3: "",
            productName: "",
            category: "",
            price: 0,
            stock: 0,
            mysterybox: false,
            desc1: "",
            desc2: "",
            desc3: ""

        }
    }
    handleFirstImage(e) {
        this.setState({ img1: e.target.value })
    }
    handleSecondImage(e) {
        this.setState({ img2: e.target.value })
    }
    handleThirdImage(e) {
        this.setState({ img3: e.target.value })
    }
    handleProductNameChange(e) {
        this.setState({ productName: e.target.value })
    }
    handleCategoryChange(e) {
        console.log(e.target.value);
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
    handleChecked(e) {
        console.log(e.target.checked);
        this.setState({
            mysterybox: e.target.checked
        })
    }
    handleDropdownChange(e) {
        console.log(e.target);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        const data = {
            title: this.state.productName,
            img1: this.state.img1,
            img2: this.state.img2,
            img3: this.state.img3,
            category: this.state.category,
            mysterybox: this.state.mysterybox,
            price: this.state.price,
            stock: this.state.stock,
            desc1: this.state.desc1,
            desc2: this.state.desc2,
            desc3: this.state.desc3
        }
        const token = this.props.user.user.accessToken
        axios.post('http://localhost:5000/api/products', data,
            {
                headers: {
                    token: `Bearer ${token}`
                }
            })
            .then(res => {
                toast.info("product created successfully", {
                    position: "bottom-left"
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div>
                <Container className='my-5' >
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <Row className='mx-md-5 m-auto'>
                            <h5>Upload Images</h5>
                            <div className="form-group  my-3">
                                <input onChange={e => this.handleFirstImage(e)} type="text" className="form-control" id="img1" placeholder="Upload your image link" />
                            </div>
                            <div className="form-group my-3">
                                <input onChange={e => this.handleSecondImage(e)} type="text" className="form-control" id="exampleInputPassword1" placeholder="Upload your image link" />
                            </div>
                            <div className="form-group my-3">
                                <input onChange={e => this.handleThirdImage(e)} type="text" className="form-control" id="exampleInputPassword1" placeholder="Upload your image link" />
                            </div>
                        </Row>
                        <Row className='align-items-center justify-content-center'>
                            <h5>Add Product Description</h5>
                            <Col xs={12} md={6}>
                                <div className="form-group my-3">
                                    <input className="form-control" onChange={e => this.handleProductNameChange(e)} type="text" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                                </div>
                                <div className=' rounded text-start'>
                                    <label htmlFor="cars"> Chose Category</label>
                                    <Form.Select onChange={e => this.handleCategoryChange(e)} name="cars" id="cars">
                                        {categoryData.slice(0, -1).map(data => <option value={data.link}>{data.category}</option>)}
                                    </Form.Select>
                                </div>
                                <div class="form-check w-50 mt-3">
                                    <input onChange={e => this.handleChecked(e)} type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Add to Mystery Box</label>
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
                        <button type="submit" className="btn btn-primary">Create Product</button>
                    </form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(CreateProduct);
