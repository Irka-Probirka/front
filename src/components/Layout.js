import ChangeThemeButton from "./changeThemeButton";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";


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


const AuthMenu = () => {
    const {user, isAuth, logOut} = useAuth();

    if (isAuth) {
        return (
            <div className={'group relative'}>
                <span className={'select-none'}>{user?.first_name} {user?.last_name}</span>
                <div
                    className={`
                        hidden group-hover:block hover:block
                        absolute left-0 right-0 -bottom-[max-content] w-full pt-2
                    `}>
                    <div
                        className={`
                            relative flex flex-col text-right rounded-l p-3
                            bg-royal-blue-100
                            dark:bg-royal-blue-950
                            overflow-hidden
                        `}>
                        <div
                            className={'absolute w-1.5 top-0 right-0 bottom-0 bg-royal-blue-600 dark:bg-royal-blue-400'}/>
                        <ul className={'pb-2 mb-1 border-b border-solid space-y-0.5'}>
                            <li>
                                <Link to={'profile'}>Профиль</Link>
                            </li>
                            <li>
                                <Link to={'tasks'}>Задачи</Link>
                            </li>
                        </ul>
                        <button onClick={logOut}>Выйти</button>
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
        <div className={'min-w-[320px] bg-zinc-50 dark:bg-zinc-900'}>
            <header
                className={`
                    fixed top-0 w-full h-14 px-2 sm:px-6
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
            <main className={'pt-14 min-h-[100vh] text-zinc-800 dark:text-zinc-100 transition-colors duration-700'}>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout;