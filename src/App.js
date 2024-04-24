import {BrowserRouter, Route, Routes} from "react-router-dom";
import './input.css';
import Home from "./pages/home";
import About from "./pages/about";
import React, {useState} from "react";
import Layout from "./components/Layout";
import Calendar from "./pages/calendar";
import Login from "./pages/login";
import {AuthContext} from "./contexts/authContext";
import Profile from "./pages/profile";
import {useAuth} from "./hooks/useAuth";
import {getUserData} from "./api/userAPI";


function App() {
    const [user, setUser] = useState(null);

    if (!user && localStorage.getItem('auth') === 'true') {
        getUserData()
            .then(setUser)
            .catch(reason => console.log('App.js: ', reason));
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="calendar" element={<Calendar/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="profile" element={<Profile/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
