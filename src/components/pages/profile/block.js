

const Block = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={`
                py-3 px-2.5 text-white text-center rounded-lg truncate
                bg-gradient-to-br from-royal-blue-400 to-royal-blue-600 
                dark:from-royal-blue-600 dark:to-zinc-800 
                border border-solid border-royal-blue-600 dark:border-zinc-800
            `}
        >
            {children}
        </div>
    );
};

export default Block;