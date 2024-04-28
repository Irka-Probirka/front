import {BrowserRouter, Route, Routes} from "react-router-dom";
import './input.css';
import Home from "./pages/home";
import About from "./pages/about";
import {useState} from "react";
import Layout from "./components/Layout";
import Calendar from "./pages/calendar";
import Login from "./pages/login";
import {AuthContext} from "./contexts/authContext";
import Profile from "./pages/profile";
import {getUserData} from "./api/userAPI";
import PrivateWrapper from "./contexts/privateWrapper";
import Lesson from "./pages/lesson";


function App() {
    const [user, setUser] = useState(null);

    if (!user && localStorage.getItem('auth') === 'true') {
        getUserData()
            .then(setUser)
            .catch(reason => {
                localStorage.setItem('auth', 'false');
                localStorage.removeItem('token');
                console.log('App.js: ', reason);
            });
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

                        <Route element={<PrivateWrapper/>}>
                            <Route path="profile" element={<Profile/>}/>
                            <Route path="lesson/:id" element={<Lesson/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
