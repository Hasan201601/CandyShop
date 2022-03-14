import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newArrivals } from '../../../assets/data/data';

class AllProducts extends Component {
    render() {
        return (
            <div>
                <Container className='my-5'>
                    <p>All Products</p>
                    <div class="input-group mb-3 px-5 w-50 m-auto">
                        <input type="text" class="form-control" placeholder="Search for product" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span class="input-group-text" id="basic-addon2"><i className="bi bi-search pointer text-dark"></i></span>
                    </div>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            newArrivals.map((na, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{na.name}</td>
                                    <td>Otto</td>
                                    <td>$35</td>
                                    <td><Link className='text-decoration-none pointer text-dark' to={`${na.id}`}><i className="bi bi-pencil"></i> Edit Product</Link></td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AllProducts;
