import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import withRouter from '../../../utilities/withRouter';

class Editproduct extends Component {

    render() {
        return (
            <div>
                Update Product {this.props.params.id}
                <Container className='my-5' >
                    <form>
                        <Row className='mx-md-5 m-auto'>
                            <h5>Update Images</h5>
                            <div className="form-group  my-3">
                                <input type="file" className="form-control" id="img1" placeholder="file" />
                            </div>
                            <div className="form-group my-3">
                                <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div className="form-group my-3">
                                <input type="file" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                        </Row>
                        <Row className='align-items-center justify-content-center'>
                            <h5>Update Product Description</h5>
                            <Col xs={12} md={6}>
                                <div className="form-group my-3">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                                </div>
                                <div className="form-group my-3">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Category" />
                                </div>
                                <div className="form-group my-3">
                                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price" />
                                </div>
                                <div className="form-group my-3">
                                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Available Stock" />
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="form-group my-3">
                                    <textarea type="text" placeholder='description1' className="form-control" />
                                </div>
                                <div className="form-group my-3">
                                    <textarea type="text" placeholder='description2' className="form-control" />
                                </div>
                                <div className="form-group my-3">
                                    <textarea type="text" placeholder='description3' className="form-control" />
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

export default withRouter(Editproduct);
