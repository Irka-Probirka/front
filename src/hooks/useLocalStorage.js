import {useEffect, useState} from "react";

export const useLocalStorage = (key, initial) => {
    const [state, setState] = useState(() => {
        const localData = localStorage.getItem(key);
        return localData || initial
    })

    useEffect(() => {
        localStorage.setItem(key, state);
    }, [state]);

    return [state, setState]
};