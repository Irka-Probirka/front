

const CustomRadioInput = ({children, id, onInputChange, ...props}) => {
    return (
        <label
            className={`
                w-max px-3.5 py-2 rounded-lg text-black bg-royal-blue-100
                has-[:checked]:bg-royal-blue-700 has-[:checked]:text-white
                hover:bg-royal-blue-400 hover:text-white hover:cursor-pointer
            `}
            {...props}
        >
            {children}
            <input type="radio" name={'changeObject'} id={id} className={'hidden'} onChange={onInputChange}/>
        </label>
    )
}

export default CustomRadioInput;