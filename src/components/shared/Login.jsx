import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Firebase from '../../Authentication/Auth';
import { setUser } from '../../redux/UserSlice';
import withRouter from '../../utilities/withRouter';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            email: "",
            password: ""
        })
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
        const email = this.state.email;
        const password = this.state.password;
        const location = this.props.location;
        const navigate = this.props.navigate;
        console.log(email, password, location);
        userLogin(email, password)
            .then(res => {
                this.props.dispatch(setUser(res.data))
                this.props.handleClose()
            })

    }
    render() {
        return (
            <div className='d-flex flex-column'>
                <form onSubmit={e => this.handleLogin(e)}>
                    <input className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="email" placeholder='Email' onBlur={e => this.handleEmailChange(e)} />
                    <input className='text-white w-100 my-2 p-2 border-bottom bg-transparent border-0' type="password" placeholder="Password" onBlur={e => this.handlePasswordChange(e)} />
                    <button type="submit" onClick={this.handleLogin} className='w-100 p-2 btn btn-light border-0 my-2'>SIGN IN</button>
                </form>
                <Link className='text-decoration-none ' to="/register"><p className='text-center'>Create Account</p></Link>
                <p className='text-center'>Forgot Your Password?</p>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withRouter(Login));
