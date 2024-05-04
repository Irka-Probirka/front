import ButtonClose from "./buttonClose";


const Modal = ({children, visible, setVisible}) => {

    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 z-[100] bg-[rgba(0,0,0,.3)] transition-colors ${visible ? 'block' : 'hidden'}`}
            id={`modal`}
        >
            <div className={`
                absolute top-0 left-0 400:top-[50%] 400:left-[50%] 400:-translate-x-[50%] 400:-translate-y-[50%] 
                w-full h-[100vh] 400:w-[380px] sm:min-h-max 400:h-[80vh] 800:w-[550px] 800:h-[380px] 
                overflow-hidden shadow-2xl
                p-3 400:rounded-xl bg-white dark:bg-zinc-900 z-[101]
            `}>
                <div className={'relative pt-1.5 h-full'}>
                    <div className={'absolute top-0 right-0 m-0.5'}>
                        <ButtonClose
                            type={'outline'}
                            onClick={(e) => {
                                e.preventDefault();
                                setVisible(false);
                            }}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;