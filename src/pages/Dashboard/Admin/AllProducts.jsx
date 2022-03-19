import axios from 'axios';
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newArrivals } from '../../../assets/data/data';

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/products")
            .then(res => {
                console.log(res.data);
                this.setState({ products: res.data })
            })
    }
    handleDelete(id) {
        axios.delete(`http://localhost:5000/api/products/${id}`)
            .then(res => console.log(res.data))
        const remainingProducts = this.state.products.filter(pd => pd.id !== id)
        this.setState({
            products: remainingProducts
        })
    }
    handleChange(e) {
        const products = this.state.products.filter(pd => pd.includes(e.target.value))
        this.setState({
            products
        })
    }
    handleSubmit(e) {
        const products = this.state.products.filter(pd => pd.includes(e.target.value))
        this.setState({
            products
        })
    }

    render() {
        return (
            <div>
                <Container className='my-5'>
                    <p>All Products</p>
                    <form onSubmit={e => this.handleSubmit(e)} class="input-group mb-3 px-5 w-50 m-auto">

                        <input onChange={e => this.handleChange(e)} type="text" class="form-control" placeholder="Search for product" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span class="input-group-text" id="basic-addon2"><i className="bi bi-search pointer text-dark"></i></span>
                    </form>
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        {
                            newArrivals.map((na, index) => <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{na.name}</td>
                                    <td>Otto</td>
                                    <td>$35</td>
                                    <td>
                                        <span className='mx-2'>
                                            <Link className='text-decoration-none pointer text-dark' to={`${na.id}`}><i className="bi bi-pencil"></i>Edit</Link>
                                        </span>
                                        <span className='pointer text-dark' onClick={() => this.handleDelete(na.id)}>
                                            <i className="bi bi-trash pointer text-dark"></i>Delete
                                        </span>
                                    </td>
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
