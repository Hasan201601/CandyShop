import axios from "axios";
import { connect } from "react-redux";
import { baseUrl } from "../assets/data/api";



const Auth = () => {

    const userCreateAccount = (email, password, name) => {
        console.log(baseUrl + "/api/auth/register");
        return axios.post(baseUrl + "/api/auth/register", {
            userName: name,
            email,
            password
        })
    }
    const userLogin = (email, password) => {
        console.log(baseUrl + "/api/auth/register");
        return axios.post(baseUrl + "/api/auth/login", {
            email,
            password
        })
    }

    return { userCreateAccount, userLogin }
}
export default Auth;