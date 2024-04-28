import ChangeThemeButton from "./changeThemeButton";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {useEffect, useState} from "react";


const NavLink = ({href, children}) => {
    const location = useLocation();
    const active = location.pathname === href;

    return (
        <Link
            to={href}
            className={`
                ${active ? 'text-zinc-800 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'} 
                h-full flex items-center font-[500] px-1
            `}
        >
            {children}
        </Link>
    )
}


const MenuLink = ({to, children}) => {
    return (
        <Link to={to} className={'flex justify-between items-center px-3 py-2 hover:bg-royal-blue-400 hover:text-white dark:hover:bg-royal-blue-700'}>
            {children}
        </Link>
    )
}


const AuthMenu = () => {
    const [visible, setVisible] = useState(false);
    const {user, isAuth, logOut} = useAuth();

    const handlerOpenMenu = (event) => {
        if (event.target.id !== 'headerMenu') {
            setVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handlerOpenMenu);

        return () => {document.removeEventListener('click', handlerOpenMenu)}
    }, [])

    if (isAuth) {
        return (
            <div className={'relative'} onClick={() => setVisible(prev => !prev)}>
                <span className={'hidden 400:block select-none hover:cursor-pointer'} id={"headerMenu"}>
                    {user?.first_name} {user?.last_name}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                     className="size-6 block 400:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
                <div
                    className={`
                        ${visible ? 'block' : 'hidden'}
                        absolute right-0 -bottom-[max-content] w-52 mt-[15px]
                    `}
                >
                    <div
                        className={'flex flex-col text-right overflow-hidden rounded-md bg-zinc-100 dark:bg-royal-blue-950 shadow-lg dark:shadow-royal-blue-900'}
                    >
                        <ul className={'border-b border-solid space-y-0.5'}>
                            <MenuLink to={'profile'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                </svg>
                                <span>Профиль</span>
                            </MenuLink>
                            <MenuLink to={'tasks'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                </svg>
                                <span>Задачи</span>
                            </MenuLink>
                        </ul>
                        <button onClick={logOut} className={'w-full py-2.5 hover:bg-royal-blue-400 hover:text-white dark:hover:bg-royal-blue-700'}>Выйти</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link to={'/login'}>Войти</Link>
    )
}


const SvgIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
        </svg>
    )
}


const Layout = () => {

    // border-zinc-600 dark:border-zinc-400
    return (
        <div className={'min-w-[320px] min-h-[100vh] flex flex-col bg-zinc-50 dark:bg-zinc-900'}>
            <header
                className={`
                    fixed top-0 w-full h-14 px-2 sm:px-6 z-50
                    text-zinc-800 dark:text-zinc-100
                    bg-white dark:bg-zinc-900
                    border-b border-solid
                `}
            >
                <nav className={'h-full flex items-center'}>
                    <div className={'flex items-center text-lg tracking-normal mr-6 select-none'}>
                        <SvgIcon/> Диплом
                    </div>
                    <div className={'h-full hidden sm:flex items-center space-x-3'}>
                        <NavLink href={'/'}>Курсы</NavLink>
                        <NavLink href={'/calendar'}>Календарь</NavLink>
                        <NavLink href={'/about'}>Задачи</NavLink>
                    </div>
                    <div className={'grow flex gap-[10px] items-center justify-end'}>
                        <ChangeThemeButton/>
                        <AuthMenu/>
                    </div>
                </nav>
            </header>
            <main className={'pt-14 mb-6 grow text-zinc-800 dark:text-zinc-100 transition-colors duration-700'}>
                <Outlet/>
            </main>
            <footer className={'h-40 bg-zinc-500'}>

            </footer>
        </div>
    )
}

export default Layout;