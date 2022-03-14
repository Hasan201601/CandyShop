import React, { Component } from 'react';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import bg from "../assets/images/reg-bg.jpg"
import Firebase from '../Authentication/FirebaseAuth';
import withRouter from '../utilities/withRouter';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handlelastNameChange = this.handlelastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }
    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        })
    }
    handlelastNameChange(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleRegistration(e) {
        e.preventDefault()
        const { userCreateAccount } = Firebase()
        const userName = this.state?.firstName + " " + this.state?.lastName;
        const email = this.state.email;
        const password = this.state.password;
        const location = this.props.location;

        const navigate = this.props.navigate;
        userCreateAccount(email, password, userName, location, navigate)

    }

    render() {
        return (
            <div>
                <Header />
                <div style={{ background: `url(${bg})`, backgroundSize: "cover" }} className=' text-white py-5 position-relative '>
                    <div style={{ position: "relative", zIndex: 999 }}>
                        <h1>Create Account</h1>
                        <div className='my-2 bg-dark form-container'>
                            <form onSubmit={e => this.handleRegistration(e)}>
                                <input required className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="text" placeholder='First Name' onBlur={e => this.handleFirstNameChange(e)} />
                                <input required className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="text" placeholder='Last Name' onBlur={e => this.handlelastNameChange(e)} />
                                <input required className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="email" placeholder='Email' onBlur={e => this.handleEmailChange(e)} />
                                <input required className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="password" placeholder="Password" onBlur={e => this.handlePasswordChange(e)} />
                                <button type='submit' className='w-100 p-2 btn btn-danger fw-bolder text-white border-0 my-2'>CREATE</button>
                            </form>
                            <p>Return to Store</p>
                        </div>
                    </div>
                    <div className='overlay'>

                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Register);
