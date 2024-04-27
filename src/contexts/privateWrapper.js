import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";


const PrivateWrapper = () => {

    const { isAuth } = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;