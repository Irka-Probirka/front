import {API_URL} from "./API_URLS";


export const getSubjects = async () => {
    const response = await fetch(API_URL + 'subject');

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении предметов')
}