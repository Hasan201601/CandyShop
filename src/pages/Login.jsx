import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';
import withRouter from '../utilities/withRouter';
import bg from "../assets/images/reg-bg.jpg"
import Firebase from '../Authentication/Auth';
import { setUser } from '../redux/UserSlice';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

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

    handleLogin(e) {
        e.preventDefault()
        const { userLogin } = Firebase()
        const userName = this.state?.firstName + " " + this.state?.lastName;
        const email = this.state.email;
        const password = this.state.password;
        const location = this.props.location;
        const destination = location.state?.from || "/"
        const navigate = this.props.navigate;
        userLogin(email, password, userName)
            .then(res => {
                this.props.dispatch(setUser(res.data))
                navigate(destination)
            })

    }
    render() {
        return (
            <div>
                <Header />
                <div style={{ background: `url(${bg})`, backgroundSize: "cover" }} className=' text-white py-5 position-relative '>
                    <div style={{ position: "relative", zIndex: 999 }}>
                        <h1>Login to Your Account</h1>
                        <div className='my-2 bg-dark form-container'>
                            <form onSubmit={e => this.handleLogin(e)}>

                                <input required className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="email" placeholder='Email' onBlur={e => this.handleEmailChange(e)} />
                                <input required className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="password" placeholder="Password" onBlur={e => this.handlePasswordChange(e)} />
                                <button type='submit' className='w-100 p-2 btn btn-danger fw-bolder text-white border-0 my-2'>Login</button>
                            </form>
                            <p className='mb-0'>Don't Have an Account?</p>
                            <Link to="/register" className='text-decoration-none'><p>Create Account</p></Link>
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
const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withRouter(Login));
