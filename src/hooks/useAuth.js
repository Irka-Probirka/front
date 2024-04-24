import {useContext} from "react";
import {AuthContext} from "../contexts/authContext";


export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const login = (user, token) => {
        setUser(user);
        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', token);
    };

    const isAuth = localStorage.getItem('auth') === 'true';

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
    };

    return { user, setUser, login, logOut, isAuth };
};