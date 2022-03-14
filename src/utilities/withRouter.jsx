import { useLocation, useNavigate, useParams } from "react-router";

export default function withRouter(Child) {
    return (props) => {
        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation()
        return <Child {...props} params={params} navigate={navigate} location={location} />
    }
}
