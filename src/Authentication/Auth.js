import axios from "axios";
import { connect } from "react-redux";



const Auth = () => {

    const userCreateAccount = (email, password, name) => {
        console.log(email, password);
        return axios.post("http://localhost:5000/api/auth/register", {
            userName: name,
            email,
            password
        })
    }
    const userLogin = (email, password) => {
        return axios.post("http://localhost:5000/api/auth/login", {
            email,
            password
        })
    }

    return { userCreateAccount, userLogin }
}
export default Auth;