import axios from 'axios';
import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categoryData } from '../assets/data/data';


class CategoriesSection extends Component {

    render() {
        return (

            <div className=' py-5  text-center'>

                <h3 >Build A Box of Treats</h3>
                <div className='fw-bold mt-2 w-50 m-auto'>
                    <p>Click on the Red Boxes to Buy American Sweets and more! Build your order here from a range of Imported sweets, snacks, sodas, and cakes!</p>
                </div>
                <Row xs={1} md={2} className="g-0 border-0">
                    {categoryData.map((cat) => (
                        <Col className='overflow-hidden shadow-lg'>
                            <Card className='position-relative  rounded hover' >
                                <Card.Img height="200px" className='cat-img w-100' variant="top" src={cat.img} />
                                <div className='overlay'>

                                </div>
                                <div className='text-center my-2 position-absolute top-50 start-50 translate-middle'>
                                    <Link to={`/products/${cat.link}`}>
                                        <button className='btn btn-danger border-0'>{cat.category}</button>
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default CategoriesSection;
