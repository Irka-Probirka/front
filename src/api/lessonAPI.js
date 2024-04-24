import {API_URL} from "./API_URLS";


export const getAllLessons = async () => {
    const response = await fetch(API_URL + 'lessons');

    if (response.ok) {
        return await response.json()
    }

    return Promise.reject('Ошибка при получении уроков')
}