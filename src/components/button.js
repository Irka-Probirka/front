

const Button = ({type, w, disable, children, ...props}) => {
    let className = '';
    let width = 'w-full';

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
            className={`${w ? w + ' px-3' : width} py-1 text-center rounded-lg button-shadow ${className} transition-colors duration-300`}
            disabled={!!disable}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;