import axios from 'axios';
import React, { Component } from 'react';
import { Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../assets/data/api';
import withRouter from '../../../utilities/withRouter';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImage: '',
            userName: "",
            phone: "",
            nationality: "",
            address: ""

        }
    }
    handleProfileImage(e) {
        this.setState({ profileImage: e.target.value })
    }
    handleNameChange(e) {
        this.setState({ userName: e.target.value })
    }
    handlePhoneChange(e) {
        console.log(e.target.value);
        this.setState({ phone: e.target.value })
    }
    handleAddressChange(e) {
        this.setState({ address: e.target.value })
    }
    handleNationalityChange(e) {
        this.setState({ nationality: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        const data = {
            userName: this.state.userName,
            profileImage: this.state.profileImage,
            address: this.state.address,
            phone: this.state.phone,
            nationality: this.state.nationality
        }
        const id = this.props.user.user._id;
        const token = this.props.user.user.accessToken
        axios.put(baseUrl + `/api/users/${id}`, data)
            .then(result => {
                toast.success("Account Updated Successfully", {
                    position: "bottom-left"
                })
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div >
                <Container className='my-5' >
                    <form className='py-5' style={{ maxWidth: "450px", margin: "auto" }} onSubmit={e => this.handleSubmit(e)}>
                        <Row className='align-items-center justify-content-center '>
                            <h5>Update Photo</h5>
                            <InputGroup className="mb-3" >
                                <InputGroup.Text className='bg-info' id="inputGroup-sizing-default"><i className=" bi bi-cloud-plus-fill"></i></InputGroup.Text>
                                <FormControl onChange={e => this.handleProfileImage(e)}
                                    placeholder="Upload Photo Link"
                                />
                            </InputGroup>


                            <h5>Update Your Info</h5>
                            <Col>
                                <div className="form-group my-3">
                                    <input className="form-control" onChange={e => this.handleNameChange(e)} type="text" placeholder="Update Your Name" />
                                </div>
                                <div className="form-group my-3">
                                    <input onChange={e => this.handlePhoneChange(e)} type="text" className="form-control" placeholder="Update your phone" />
                                </div>
                                <div className="form-group my-3">
                                    <input onChange={e => this.handleAddressChange(e)} type="text" className="form-control" placeholder="Update your address" />
                                </div>
                                <div className="form-group my-3">
                                    <input className="form-control" onChange={e => this.handleNationalityChange(e)} type="text" placeholder="Update nationality" />
                                </div>

                            </Col>
                        </Row>
                        <button type="submit" className="btn btn-info">Update Profile</button>
                    </form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withRouter(UpdateProfile));
