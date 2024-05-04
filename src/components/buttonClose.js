


const ButtonClose = ({type, ...props}) => {
    let className = '';

    switch (type){
        case 'outline':
            className = 'text-royal-blue-400 border border-solid border-royal-blue-400 hover:text-royal-blue-600 hover:border-royal-blue-600 active:text-royal-blue-700 active:border-royal-blue-700 disabled:text-royal-blue-200 disabled:bg-royal-blue-200';
            break;
        case 'flat':
        default:
            className = 'text-white bg-royal-blue-500 hover:bg-royal-blue-600 active:bg-royal-blue-700 disabled:bg-royal-blue-100 disabled:text-royal-blue-400';
            break;
    }

    return (
        <button
            className={`rounded-md p-1 ${className}`}
            {...props}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
        </button>
    );
};

export default ButtonClose;