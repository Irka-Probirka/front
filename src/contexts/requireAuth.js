import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const RequireAuth = ({children}) => {
    const { isAuth } = useAuth();

    if (!isAuth){
        return <Navigate to='/login'/>
    }
    return children;
};

export default RequireAuth;