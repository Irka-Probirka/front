import {useNavigate} from "react-router-dom";


const LinkBack = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`
                group flex items-center gap-1 
                rounded-lg overflow-hidden py-0.5 px-3 w-max
                text-royal-blue-400 border border-solid border-royal-blue-400
                dark:text-royal-blue-500 dark:border-royal-blue-500
                hover:bg-royal-blue-600 dark:hover:bg-royal-blue-700 hover:text-white
                transition-colors duration-300
            `}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor"
                 className="size-5 group-hover:-translate-x-1.5 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
            </svg>
            <span className={'pb-px'}>Назад</span>
        </button>
    )
}

export default LinkBack;