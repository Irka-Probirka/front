import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";
import './input.css';
import Home from "./pages/home";
import About from "./pages/about";
import React from "react";
import ChangeThemeButton from "./components/changeThemeButton";


const Layout = () => {
    return (
        <>
            <header className={`
                fixed top-0 w-full py-2 transition-colors duration-[.400s]
                text-royal-blue-950 bg-royal-blue-200 
                dark:text-royal-blue-50 dark:bg-royal-blue-950
            `}>
                <nav className={'flex items-center justify-center max-w-[1024px] w-full mx-auto'}>
                    <ul className={'flex gap-[10px]'}>
                        <li>
                            <Link to={'/'}>Главная</Link>
                        </li>
                        <li>
                            <Link to={'/about'}>что-то</Link>
                        </li>
                        <li>
                            <Link to={'#'}>куда-то</Link>
                        </li>
                        <li>
                            <Link to={'#'}>зачем-то</Link>
                        </li>
                    </ul>
                    <div className={'grow flex gap-[10px] items-center justify-end'}>
                        <ChangeThemeButton/>
                        <Link to={'#'}>
                            Войти
                        </Link>
                    </div>
                </nav>
            </header>
            <div className={'mt-10'}>
                <Outlet/>
            </div>
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
