import { FpxBankElement } from '@stripe/react-stripe-js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { baseUrl } from '../../../assets/data/api';

class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            category: ""
        }
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleImgChange(e) {
        this.setState({
            image: e.target.value
        })
    }
    handleCatChange(e) {
        this.setState({
            category: e.target.value

        })
    }
    handleClick(e) {
        e.preventDefault()
        const token = this.props.user.accessToken
        const data = {
            title: this.state.category,
            image: this.state.image
        }

        console.log(baseUrl + `/api/categories/`);
        fetch(`${baseUrl}/api/categories/`, {
            method: 'POST',
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
            <div style={{ height: "100vh" }} className='d-flex align-items-center justify-content-center'>
                <form className='my-5 d-flex flex-column'>
                    <h1>Create a New Category</h1>
                    <input onChange={e => this.handleCatChange(e)} accept="images/*" type="text" />
                    <input className='my-3' onChange={e => this.handleImgChange(e)} type="file" />
                    <button onClick={e => this.handleClick(e)} type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(CreateCategory);
